const fn = require("./main");
const assert = require("assert").strict;
const result = fn("Attack at dawn!", 12);
assert.strictEqual(result, "Mffmow mf pmiz!", 'Negative string');