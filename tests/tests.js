const { caesarEncrypt, caesarDecrypt, vigenereEncryptText, vigenereDecryptText } = require("../index");
const data = require("./data.json");
const assert = require("assert").strict;

const testingWorker = (data, fn) => {
    let results = [];
    for (const test of data) {
        const [params, expected, name] = test;
        const result = fn(params.value, params.key);
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

console.log("Caesar Encrypt");
results = testingWorker(data.caesareEncrypt, caesarEncrypt);
console.table(results);

results = [];

console.log("Caesar Decrypt");
results = testingWorker(data.caesareDecrypt, caesarDecrypt);
console.table(results);

results = [];

console.log("Vigenere Encrypt");
results = testingWorker(data.vigenereEncrypt, vigenereEncryptText);
console.table(results);

results = [];

console.log("Vigenere Decrypt");
results = testingWorker(data.vigenereDecrypt, vigenereDecryptText);
console.table(results);