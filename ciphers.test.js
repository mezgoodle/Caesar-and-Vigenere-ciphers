const { caesarEncrypt } = require("./ciphers");

test("testSimple", () => {
    expect(caesarEncrypt("pellentesque", 12)).toBe("bqxxqzfqecgq");
})