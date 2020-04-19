const fn = require("./ciphers");
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
    [
        [123, 19.70], "!@&*^", "testNumberType"
    ],
    [
        [undefined, -0], "!@&*^", "testUndefinedType"
    ],
];

for (const test of tests) {
    const [par, expected, name] = test;
    const result = fn(par[0], par[1]);
    try {
        assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
        console.log(err);
    }
}