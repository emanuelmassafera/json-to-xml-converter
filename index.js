const fs = require('fs');
const path = require('path');

function createGroup(originData, groupedData, data, splittedTarget) {
  let auxGroupedData = {};

  if (splittedTarget.length === 1) {
    return { ...data, target: splittedTarget[0] };
  } else {
    if (!groupedData[splittedTarget[0]]) {
      let arraySize = 0;

      if (splittedTarget.length === 2) {
        const auxTargetSplitted = data.origin.split('.');

        if (auxTargetSplitted.find((element) => element === 'x')) {
          const index = auxTargetSplitted.indexOf('x');
          arraySize = originData[auxTargetSplitted[index - 1]].length;
        }
      }

      auxGroupedData = { nodes: {}, target: splittedTarget[0], array: arraySize };
      auxGroupedData.nodes[splittedTarget[1]] = createGroup(originData, auxGroupedData.nodes, data, splittedTarget.slice(1));

      return auxGroupedData;
    } else {
      auxGroupedData = groupedData[splittedTarget[0]];
      auxGroupedData.nodes[splittedTarget[1]] = createGroup(originData, auxGroupedData.nodes, data, splittedTarget.slice(1));

      return auxGroupedData;
    }
  }
}

function getProperty(originData, data) {
  let property;

  if (data.origin) {
    const splittedOrigin = data.origin.split(".");
    let auxProperty = originData;

    for (let i = 0; i < splittedOrigin.length; i++) {
      if (auxProperty[splittedOrigin[i]] || auxProperty[splittedOrigin[i]] === 0) {
        auxProperty = auxProperty[splittedOrigin[i]];
      } else {
        auxProperty = null;
        break;
      }
    }

    property = auxProperty;
  } else if (data.static_value) {
    property = data.static_value;
  }

  if (data.convert_function) {
    const convertFunction = new Function(data.convert_function)();
    property = convertFunction(property);
  }

  return property;
}

function getXML(originData, target, data) {
  let xml = '';

  if (data.array && data.array !== 0) {
    for (let index = 0; index < data.array; index++) {
      let auxXML = '';

      for (const [key, value] of Object.entries(data.nodes)) {
        let auxData = value;

        if (value.origin) {
          const auxOrigin = value.origin.replace('.x', `.${index}`);
          auxData = { ...value, origin: auxOrigin };
        }

        auxXML = auxXML + getXML(originData, key, auxData);
      }

      auxXML = auxXML || auxXML === 0 ? `\n<${target}>${auxXML}</${target}>` : '';
      xml = xml + auxXML;
    }

    return xml;
  } else {
    if (!data.nodes) {
      xml = getProperty(originData, data);

      if (xml === 'TO_BE_REMOVED') {
        return '';
      }
    } else {
      for (const [key, value] of Object.entries(data.nodes)) {
        xml = xml + getXML(originData, key, value);
      }
    }

    return xml || xml === 0 ? `\n<${target}>${xml}</${target}>` : '';
  }
}

function reviewXML(xml) {
  let auxXML = xml;
  let index = auxXML.indexOf('INCREMENTAL_NUMBER');
  let count = 1;

  while (index !== -1) {
    auxXML = auxXML.replace('INCREMENTAL_NUMBER', count);
    count++;
    index = auxXML.indexOf('INCREMENTAL_NUMBER');
  }

  return auxXML;
}

module.exports = function (originFilePath = './order.json', resultFilePath = './result.xml') {
  if (!fs.existsSync(originFilePath)) throw new Error('The origin file does not exist');
  if (path.extname(originFilePath) !== '.json') throw new Error('The origin file is not a JSON');
  if (path.extname(resultFilePath) !== '.xml') throw new Error('The result file is not a XML');

  const originData = JSON.parse(fs.readFileSync(originFilePath));
  const mappingData = JSON.parse(fs.readFileSync('./mapping.json'));

  let groupedData = {};
  mappingData.map((element) => {
    const splittedTarget = element.target.split('.');
    groupedData[splittedTarget[0]] = { ...createGroup(originData, groupedData, element, splittedTarget) };
  })

  let xmlContent = '';
  for (const [key, value] of Object.entries(groupedData)) {
    xmlContent = xmlContent + getXML(originData, key, value);
  }

  let xml =
    `<SalesOrders xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="SORTOIDOC.XSD">\n`
    + `<Orders>${xmlContent}\n</Orders>\n</SalesOrders>`;
  xml = reviewXML(xml);

  fs.writeFileSync(resultFilePath, xml, {});
}
