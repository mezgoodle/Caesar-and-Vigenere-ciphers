const fn = require("./ciphers");
const assert = require("assert").strict;

const testSimple = () => {
    let result = fn("pellentesque", 12);
    assert.strictEqual(result, "bqxxqzfqecgq", "Negative string");
};

const testZeroAmount = () => {
    let result = fn("pellentesque", 0);
    assert.strictEqual(result, "pellentesque", "Negative string");
};

const testSimpleReverse = () => {
    let result = fn("bqxxqzfqecgq", -12);
    assert.strictEqual(result, "pellentesque", "Negative string");
};

const testUpperLowerCase = () => {
    let result = fn("adadA", 13123);
    assert.strictEqual(result, "twtwT", "Negative string");
};

const testStringWithSymbols = () => {
    let result = fn("ad_dA", 1);
    assert.strictEqual(result, "be_eB", "Negative string");
};

const testIntegers = () => {
    let result = fn("13123131", 5);
    assert.strictEqual(result, "13123131", "Negative string");
};

const testSymbols = () => {
    let result = fn("!@&*^", -134353);
    assert.strictEqual(result, "!@&*^", "Negative string");
};

const testSymbolsWithString = () => {
    let result = fn("!@$^@a", -1970);
    assert.strictEqual(result, "!@$^@g", "Negative string");
};

const testFloatAmount = () => {
    let result = fn("dada", 19.70);
    assert.strictEqual(result, "wtwt", "Negative string");
};

const testNumberType = () => {
    let result = fn(123, 19.70);
    assert.strictEqual(result, "wtwt", "Negative string");
};

const testUndefinedType = () => {
    let result = fn(undefined, -0);
    assert.strictEqual(result, "wtwt", "Negative string");
};

const tests = [
    testSimple,
    testZeroAmount,
    testSimpleReverse,
    testUpperLowerCase,
    testStringWithSymbols,
    testIntegers,
    testSymbols,
    testSymbolsWithString,
    testFloatAmount,
    testNumberType,
    testUndefinedType,
];

for (const test of tests) {
    try {
        test();
    } catch (err) {
        console.log(err);
    }
}