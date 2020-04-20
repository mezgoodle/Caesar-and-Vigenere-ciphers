const { caesarEncrypt } = require("../ciphers");
const tests = require("./data");

describe.each(tests)("Testing", (params, expected, name) => {
    test(name, () => {
        expect(caesarEncrypt(params.value, params.amount)).toBe(expected);
    });
});