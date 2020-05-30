'use strict';

const { caesarEncrypt, caesarDecrypt, vigenereEncryptText, vigenereDecryptText } = require('../index');
const data = require('./data.json');

const testingWorker = (data, name, fn) => {
  describe.each(data)(name, (params, expected, name) => {
    test(name, () => {
      expect(fn(params.value, params.key, params.type)).toBe(expected);
    });
  });
};

const config = [{
  name: 'Testing Caesare encrypting',
  data: data.caesareEncrypt,
  fn: caesarEncrypt
},
{
  name: 'Testing Caesare decrypting',
  data: data.caesareDecrypt,
  fn: caesarDecrypt
},
{
  name: 'Testing Vigenere encrypting',
  data: data.vigenereEncrypt,
  fn: vigenereEncryptText
},
{
  name: 'Testing Vigenere decrypting',
  data: data.vigenereDecrypt,
  fn: vigenereDecryptText
}
];

// Do all tests from config
for (const element of config) {
  testingWorker(element.data, element.name, element.fn);
}
