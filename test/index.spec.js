const path = require('path');
const fs = require('fs');
const sut = require('../src/index.js');

describe('default function', () => {
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof sut).toBe('function');
  });

  it('should throw if there is no origin file', () => {
    expect(() => sut(path.join(__dirname + '/wrong-file.json'), path.join(__dirname + '/mock-result.xml'), path.join(__dirname + '/mock-mapping.json')))
      .toThrowError(new Error('The origin file does not exist'));
  });

  it('should throw if origin file is not a JSON', () => {
    expect(() => sut(path.join(__dirname + '/wrong-file.txt'), path.join(__dirname + '/mock-result.xml'), path.join(__dirname + '/mock-mapping.json')))
      .toThrowError(new Error('The origin file is not a JSON'));
  });

  it('should throw if there is no mapping file', () => {
    expect(() => sut(path.join(__dirname + '/mock-order.json'), path.join(__dirname + '/mock-result.xml'), path.join(__dirname + '/wrong-file.json')))
      .toThrowError(new Error('The mapping file does not exist'));
  });

  it('should throw if mapping file is not a JSON', () => {
    expect(() => sut(path.join(__dirname + '/mock-order.json'), path.join(__dirname + '/mock-result.xml'), path.join(__dirname + '/wrong-file.txt')))
      .toThrowError(new Error('The mapping file is not a JSON'));
  });

  it('should throw if result file is not a XML', () => {
    expect(() => sut(path.join(__dirname + '/mock-order.json'), path.join(__dirname + '/mock-result.txt'), path.join(__dirname + '/mock-mapping.json')))
      .toThrowError(new Error('The result file is not a XML'));
  });

  it('should generate XML file on success', () => {
    if (fs.existsSync(path.join(__dirname + '/mock-result.xml'))) {
      fs.unlinkSync(path.join(__dirname + '/mock-result.xml'));
    }
    expect(fs.existsSync(path.join(__dirname + '/mock-result.xml'))).toBeFalsy();

    sut(path.join(__dirname + '/mock-order.json'), path.join(__dirname + '/mock-result.xml'), path.join(__dirname + '/mock-mapping.json'));
    expect(fs.existsSync(path.join(__dirname + '/mock-result.xml'))).toBeTruthy();
  });
})
