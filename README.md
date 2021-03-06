[![Node.js CI](https://github.com/emanuelmassafera/json-to-xml-converter/actions/workflows/node.js.yml/badge.svg)](https://github.com/emanuelmassafera/json-to-xml-converter/actions/workflows/node.js.yml)

<h1 align="center">JSON to XML Converter</h1>

<p align="center">📦 Package that converts Magento 2 orders from JSON  to XML 📦</p>

---

Table of contents
=================
<!--ts-->
   * [About](#-about-the-project)
   * [Using the package](#-using)
   * [Running the project](#-running)
   * [Author](#-author)
   * [License](#-license)
<!--te-->

---

## About <a name="-about-the-project" style="text-decoration:none"></a>

The JSON to XML Converter package adapts Magento 2 orders to be pushed to a different application. This application expects an XML file as its input, while the Magento 2 orders are presented as JSON file with completely different formats.

Basically, the NodeJS Converter package performs the conversion based on a data mapping JSON file. This mapping file must contain origin and target fields, which links a JSON key to its respective XML tag. Moreover, the mapping file may present a field to define if the field is static and its respective value.  Lastly, the mapping can also define a JS conversion function, which transforms the captured value.
 
Below, you can see an example of a **mapping.json** file:

```json
[
  {
    "origin": "",
    "target": "OrderHeader.OrderActionType",
    "static_value": "A"
  },
  {
    "origin": "extension_attributes.syspro_id",
    "target": "OrderHeader.Customer"
  },
  {
    "origin": "created_at",
    "target": "OrderHeader.OrderDate",
    "convert_function": "return function convert(property) { return new Date(property).toISOString().slice(0,10); };"
  }
]
```

The result is an XML file based on the rules from the mapping.

---

## Using the package <a name="-using" style="text-decoration:none"></a>

#### Prerequisites 

To use the NodeJS package, you have to create a **.npmrc** file on your root directory and add the following lines: 

```
@emanuelmassafera:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<YOUR_PERSONAL_TOKEN>
```

The *<YOUR_PERSONAL_TOKEN>* string must be replaced with a personal token from GitHub. In order to generate this, please follow the instructions found in this [tutorial](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

#### Installation

At this time you are ready to install the package on your project. To do this, run the command:

```bash
npm install @emanuelmassafera/json-to-xml-converter@1.0.0
```

#### Usage

The JSON to XML Converter package by default exports a function that expects to receive three parameters: the origin file path, the result file path, and the mapping file path. Import the library into your code and use the function by passing your files.

```js
const convertIntoXML = require("@emanuelmassafera/json-to-xml-converter");

convertIntoXML('order.json', 'result.xml', 'mapping.json');
```

The three example files can be found in this repository: [order.json](https://github.com/emanuelmassafera/json-to-xml-converter/blob/main/order.json), [result.xml](https://github.com/emanuelmassafera/json-to-xml-converter/blob/main/result.xml) and [mapping.json](https://github.com/emanuelmassafera/json-to-xml-converter/blob/main/mapping.json).

---

## Running the project <a name="-running" style="text-decoration:none"></a>

If you want to run the project instead of using the package, follow these steps:

```bash
# Clone this repository
$ git clone https://github.com/emanuelmassafera/json-to-xml-converter.git

# Access the project folder via the terminal/cmd
$ cd json-to-xml-converter

# Install dependencies
$ npm install

# Run
$ npm start
```

The start script will run an example present in the repository, passing the files found in the root.

---

## Author <a name="-author" style="text-decoration:none"></a>

<img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/65625500?s=460&u=eb9e300de61698fc8531949a451ce2f0e9da46f9&v=4" width="100px;" alt=""/>
<sub>Emanuel Massafera</sub>

<b></b>

[![Badge](https://img.shields.io/static/v1?label=&message=Emanuel&color=blue&style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/emanuelmassafera/)](https://www.linkedin.com/in/emanuelmassafera/) [![Badge](https://img.shields.io/static/v1?label=&message=emanuel301@live.com&color=0078D4&style=flat-square&logo=Microsoft-Outlook&logoColor=white&link=mailto:emanuel301@live.com)](mailto:emanuel301@live.com)

---

## License <a name="-license" style="text-decoration:none"></a>

This repository is licensed by **MIT LICENSE**. For detailed information, read the file [LICENSE](https://github.com/emanuelmassafera/retrieve-test/blob/main/LICENSE). 

Made with ♥ by Emanuel Massafera :wave: [Get in touch!](https://www.linkedin.com/in/emanuelmassafera/)
