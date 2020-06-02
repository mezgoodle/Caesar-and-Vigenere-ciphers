'use strict';

const {
  caesarEncrypt,
  caesarDecrypt,
  vigenereEncrypt,
  vigenereDecrypt
} = require('../index');

const data = require('./data.json');
const assert = require('assert').strict;

const testingWorker = (data, fn) => {
  const results = [];
  for (const test of data) {
    const [params, expected, name] = test;
    const result = fn(params.value, params.key, params.type);
    try {
      assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
      const { message, operator } = err;
      results.push({ message, params, expected, result, operator });
    }
  }
  return results;
};

// Output
let results = [];

const config = [{
  name: 'Caesar Encrypt',
  data: data.caesareEncrypt,
  fn: caesarEncrypt
},
{
  name: 'Caesar Decrypt',
  data: data.caesareDecrypt,
  fn: caesarDecrypt
},
{
  name: 'Vigenere Encrypt',
  data: data.vigenereEncrypt,
  fn: vigenereEncrypt
},
{
  name: 'Vigenere Decrypt',
  data: data.vigenereDecrypt,
  fn: vigenereDecrypt
}
];

// Do all tests from config
for (const element of config) {
  console.log(element.name);
  results = testingWorker(element.data, element.fn);
  console.table(results);
  results = [];
}
