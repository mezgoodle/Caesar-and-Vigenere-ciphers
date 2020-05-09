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
            // Uppercase letters
            if ((code >= 65) && (code <= 90)) c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            // Lowercase letters
            else if ((code >= 97) && (code <= 122)) c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
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

const keepLetters = (s) => (s.replace(/[^a-zA-Z]+/g, ""));

const isLetter = (c) => (c.match(/[a-zA-Z]+/));

const isUpperCase = (c) => (c.match(/[A-Z]+/));

const workerChar = (char, k, type = "e") => {
    if (!isLetter(char) || !isLetter(k)) return char;
    let uppercase = isUpperCase(char);
    char = char.toLowerCase().charCodeAt(0);
    k = k.toLowerCase().charCodeAt(0);
    a = "a".charCodeAt(0);
    A = "A".charCodeAt(0);
    if (type === "d") {
        let t = a + ((char - a) - (k - a));
        if (t < a) t += 26;
        t = String.fromCharCode(t);
        return uppercase ? t.toUpperCase() : t;
    } else return String.fromCharCode((uppercase ? A : a) + (((char - a) + (k - a)) % 26));
};

const worker = (str, key, type) => {
    key = keepLetters(key);
    let result = "",
        keyIndex = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        if (isLetter(char)) {
            k = key.charAt(keyIndex++ % key.length);
            temp = workerChar(char, k, type);
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