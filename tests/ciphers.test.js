const { caesarEncrypt } = require("../ciphers");
const data = require("./data.json");

describe.each(data.caesareEncrypt)("Testing", (params, expected, name) => {
    test(name, () => {
        expect(caesarEncrypt(params.value, params.amount)).toBe(expected);
    });
});