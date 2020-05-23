const caesarEncrypt = (text = null, amount = null) => {
    if (text === null) throw Error("Message should be not empty");
    if (!Number.isInteger(amount) || amount === null) throw Error("Amount should be integer and not empty");
    // Wrap the amount
    if (amount < 0) return caesarEncrypt(text, amount + 26);
    if (typeof(text) !== "string") throw Error("String or number expected");

    // Make an output letiable
    let output = "";
    // Go through each character
    for (let i = 0; i < text.length; i++) {
        // Get the character we'll be appending
        let c = text[parseInt(i)];
        // If it's a letter...
        if (isLetter(c)) {
            // Get its code
            let code = text.charCodeAt(i);
            // Latin uppercase letters
            if ((code >= 65) && (code <= 90)) c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            // Cyrillic uppercase letters
            else if ((code >= 1040) && (code <= 1071)) c = String.fromCharCode(((code - 1040 + amount) % 26) + 1040);
            // Latin lowercase letters
            else if ((code >= 97) && (code <= 122)) c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            // Cyrillic lowercase letters
            else if ((code >= 1072) && (code <= 1103)) c = String.fromCharCode(((code - 1072 + amount) % 26) + 1072);
        };
        // Append
        output += c;
    };
    // All done!
    return output;
};

const caesarDecrypt = (text, shift) => {
    let result = "";
    shift = (26 - shift) % 26;
    result = caesarEncrypt(text, shift);
    return result;
};

const keepLetters = (s) => (s.replace(/[^a-zA-Zа-яА-Я]+/g, ""));

const isLetter = (c) => (c.match(/[a-zA-Zа-яА-Я]+/));

const isUpperCase = (c) => (c.match(/[A-ZА-Я]+/));

const workerChar = (char, k, type = "e") => {
    if (!isLetter(char) || !isLetter(k)) return char;
    let uppercase = isUpperCase(char);
    char = char.toLowerCase().charCodeAt(0);
    k = k.toLowerCase().charCodeAt(0);
    let a = "a".charCodeAt(0);
    let A = "A".charCodeAt(0);
    if (type === "d") {
        let t = a + ((char - a) - (k - a));
        if (t < a) t += 26;
        t = String.fromCharCode(t);
        return uppercase ? t.toUpperCase() : t;
    } else return String.fromCharCode((uppercase ? A : a) + (((char - a) + (k - a)) % 26));
};

const worker = (str, key, type) => {
    if (str === null || key === null) throw Error("Message and key should be not empty");
    key = keepLetters(key);
    let result = "",
        keyIndex = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        if (isLetter(char)) {
            let k = key.charAt(keyIndex++ % key.length);
            let temp = workerChar(char, k, type);
            result += temp;
        } else {
            result += char;
        }
    }
    return result;
};

const vigenereEncryptText = (text = null, key = null) => (worker(text, key, "e"));

const vigenereDecryptText = (cipher = null, key = null) => (worker(cipher, key, "d"));

module.exports = { caesarEncrypt, caesarDecrypt, vigenereEncryptText, vigenereDecryptText };