const { caesarEncrypt, caesarDecrypt } = require("../ciphers");
const data = require("./data.json");
const assert = require("assert").strict;

// Output
console.log("Encrypt");
const results = [];
for (const test of data.caesareEncrypt) {
    const [params, expected, name] = test;
    const result_encrypted = caesarEncrypt(params.value, params.amount);
    const result_decrypted = caesarDecrypt(expected, params.amount);
    try {
        assert.strictEqual(result_encrypted, expected, `Error in test "${name}"`);
    } catch (err) {
        const { message, operator } = err;
        results.push({ message, params, expected, result_encrypted, operator });
    }
    try {

    } catch (err) {
        const { message, operator } = err;
        results.push({ message, params, expected, result_decrypted, operator });
    }
}
console.table(results);