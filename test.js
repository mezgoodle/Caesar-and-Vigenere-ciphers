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
    console.log(data[i]);
}
const result = fn("Attack at dawn!", 12);
assert.strictEqual(result, "Mffmow mf pmiz!", 'Negative string');