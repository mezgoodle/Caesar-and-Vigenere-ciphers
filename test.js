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
];

for (let i = 0; i < data.length; i++) {
    let result = fn(data[parseInt(i)].value, data[parseInt(i)].amount);
    assert.strictEqual(result, data[parseInt(i)].expected, "Negative string");
}