'use strict';

const typeDefine = {
    "cyr": [32, 1040, 1071, 1072, 1105],
    "lat": [26, 65, 90, 97, 122],
};

const caesarEncrypt = (text = null, amount = null, type = null) => {
    if (text === null) throw Error("Message should be not empty");
    if (!Number.isInteger(amount) || amount === null) throw Error("Amount should be integer and not empty");
    if (typeof(text) !== "string") throw Error("String or number expected");
    // Type define
    if (!typeDefine.hasOwnProperty(type)) throw Error("Type must be \"lat\" or \"cyr\"");
    const [alpha_num, start_code_l, finish_code_l, start_code_u, finish_code_u] = typeDefine[type];
    // Wrap the amount
    if (amount < 0) return caesarEncrypt(text, amount + alpha_num, type);

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
            // lowercase letters
            if ((code >= start_code_l) && (code <= finish_code_l)) c = String.fromCharCode(((code - start_code_l + amount) % alpha_num) + start_code_l);
            // Uppercase letters
            else if ((code >= start_code_u) && (code <= finish_code_u)) c = String.fromCharCode(((code - start_code_u + amount) % alpha_num) + start_code_u);
        };
        // Append
        output += c;
    };
    // All done!
    return output;
};

const caesarDecrypt = (text, shift, type) => {
    if (!typeDefine.hasOwnProperty(type)) throw Error("Type must be \"lat\" or \"cyr\"");
    const [alpha_num] = typeDefine[type];
    let result = "";
    shift = (alpha_num - shift) % alpha_num;
    result = caesarEncrypt(text, shift, type);
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

const worker = (str, key, type, lang) => {
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

const vigenereEncryptText = (text = null, key = null, type = null) => (worker(text, key, "e", type));

const vigenereDecryptText = (cipher = null, key = null, type = null) => (worker(cipher, key, "d", type));

module.exports = { caesarEncrypt, caesarDecrypt, vigenereEncryptText, vigenereDecryptText };
console.log(caesarEncrypt("a", 1, "lat"));