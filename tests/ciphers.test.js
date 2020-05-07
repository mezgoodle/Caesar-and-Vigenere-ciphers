const { caesarEncrypt, caesarDecrypt, vigenereEncryptText, vigenereDecryptText } = require("../index");
const data = require("./data.json");

const testingWorker = (data, name, fn) => {
    describe.each(data)(name, (params, expected, name) => {
        test(name, () => {
            expect(fn(params.value, params.key)).toBe(expected);
        });
    });
};

testingWorker(data.caesareEncrypt, "Testing Caesare encrypting", caesarEncrypt);
testingWorker(data.caesareDecrypt, "Testing Caesare decrypting", caesarDecrypt);
testingWorker(data.vigenereEncrypt, "Testing Vigenere encrypting", vigenereEncryptText);
testingWorker(data.vigenereDecrypt, "Testing Vigenere decrypting", vigenereDecryptText);