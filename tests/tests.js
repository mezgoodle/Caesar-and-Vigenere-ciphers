const { caesarEncrypt } = require("../ciphers");
const assert = require("assert").strict;

// Test
const tests = [
    [
        ["pellentesque", 12], "bqxxqzfqecgq", "testSimple"
    ],
    [
        ["pellentesque", 0], "pellentesque", "testZeroAmount"
    ],
    [
        ["bqxxqzfqecgq", -12], "pellentesque", "testSimpleReverse"
    ],
    [
        ["adadA", 13123], "twtwT", "testUpperLowerCase"
    ],
    [
        ["ad_dA", 1], "be_eB", "testStringWithSymbols"
    ],
    [
        ["13123131", 5], "13123131", "testIntegers"
    ],
    [
        ["!@&*^", -134353], "!@&*^", "testSymbols"
    ],
    [
        ["!@$^@a", -1970], "!@$^@g", "testSymbolsWithString"
    ],
    [
        ["dada", -19.70], "jgjg", "testFloatAmount"
    ],
];

// Output
const results = [];
for (const test of tests) {
    const [par, expected, name] = test;
    const result = caesarEncrypt(par[0], par[1]);
    try {
        assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
        const { message, operator } = err;
        results.push({ message, par, expected, result, operator });
    }
}
console.table(results);