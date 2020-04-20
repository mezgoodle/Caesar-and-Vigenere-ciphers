const { caesarEncrypt, caesarDecrypt } = require("../ciphers");
const data = require("./data.json");

describe.each(data.caesareEncrypt)("Testing Caesare encrypting", (params, expected, name) => {
    test(name, () => {
        expect(caesarEncrypt(params.value, params.amount)).toBe(expected);
    });
});

describe.each(data.caesareDecrypt)("Testing Caesare decrypting", (params, expected, name) => {
    test(name, () => {
        expect(caesarDecrypt(params.value, params.amount)).toBe(expected);
    });
});