const { caesarEncrypt, caesarDecrypt } = require("../src/index");
const data = require("./data.json");
const assert = require("assert").strict;

// Output
console.log("Encrypt");
let results = [];
for (const test of data.caesareEncrypt) {
    const [params, expected, name] = test;
    const result = caesarEncrypt(params.value, params.amount);
    try {
        assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
        const { message, operator } = err;
        results.push({ message, params, expected, result, operator });
    }
}

console.table(results);
results = [];

console.log("Decrypt");
for (const test of data.caesareDecrypt) {
    const [params, expected, name] = test;
    const result = caesarDecrypt(params.value, params.amount);
    try {
        assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
        const { message, operator } = err;
        results.push({ message, params, expected, result, operator });
    }
}

console.table(results);