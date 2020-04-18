const fn = require("./ciphers");
const assert = require("assert").strict;

const data = [{
        value: "pellentesque",
        amount: 12,
        expected: "bqxxqzfqecgq",
    },
    {
        value: "pellentesque",
        amount: 0,
        expected: "pellentesque",
    },
    {
        value: "bqxxqzfqecgq",
        amount: -12,
        expected: "pellentesque",
    },
    {
        value: "adadA",
        amount: 13123,
        expected: "twtwT",
    },
    {
        value: "ad_dA",
        amount: 1,
        expected: "be_eB",
    },
    {
        value: "13123131",
        amount: 5,
        expected: "13123131",
    },
    {
        value: "!@&*^",
        amount: -134353,
        expected: "!@&*^",
    },
    {
        value: "!@$^@a",
        amount: -1970,
        expected: "!@$^@g",
    },
    {
        value: "dada",
        amount: 19.7,
        expected: "wtwt",
    },
];

for (let i = 0; i < data.length; i++) {
    let result = fn(data[parseInt(i)].value, data[parseInt(i)].amount);
    assert.strictEqual(result, data[parseInt(i)].expected, "Negative string");
}