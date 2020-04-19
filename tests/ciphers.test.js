const { caesarEncrypt } = require("../ciphers");

describe("caesarEncrypt:", () => {
    test("testSimple", () => {
        expect(caesarEncrypt("pellentesque", 12)).toBe("bqxxqzfqecgq");
    });

    test("testFloatAmount", () => {
        expect(caesarEncrypt("dada", -19.70)).toBe("jgjg");
    });

    test("testZeroAmount", () => {
        expect(caesarEncrypt("pellentesque", -0)).toBe("pellentesque");
    });
})