const caesarEncrypt = (text = null, amount = null) => {

    if (text === null) throw Error("Message should be not empty");

    if (!Number.isInteger(amount) || amount === null) throw Error("Amount should be integer and not empty");

    // Wrap the amount
    if (amount < 0) {
        return caesarEncrypt(text, amount + 26);
    }

    if (typeof(text) !== "string") {
        throw Error("String or number expected");
    }

    // Make an output letiable
    let output = "";

    // Go through each character
    for (let i = 0; i < text.length; i++) {

        // Get the character we'll be appending
        let c = text[parseInt(i)];

        // If it's a letter...
        if (c.match(/[a-z]/i)) {

            // Get its code
            let code = text.charCodeAt(i);

            // Uppercase letters
            if ((code >= 65) && (code <= 90)) {
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            }

            // Lowercase letters
            else if ((code >= 97) && (code <= 122)) {
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }

        }

        // Append
        output += c;

    }

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

const vigenereEncryptChar = (t, k) => {
    if (!isLetter(t) || !isLetter(k)) return t;
    let uppercase = isUpperCase(t);
    t = t.toLowerCase().charCodeAt(0);
    k = k.toLowerCase().charCodeAt(0);
    a = "a".charCodeAt(0);
    A = "A".charCodeAt(0);
    return String.fromCharCode((uppercase ? A : a) + (((t - a) + (k - a)) % 26));
};

const vigenereDecryptChar = (c, k) => {
    if (!isLetter(c) || !isLetter(k)) return c;
    let uppercase = isUpperCase(c);
    c = c.toLowerCase().charCodeAt(0);
    k = k.toLowerCase().charCodeAt(0);
    a = "a".charCodeAt(0);
    A = "A".charCodeAt(0);
    let t = a + ((c - a) - (k - a));
    if (t < a) t += 26;
    t = String.fromCharCode(t);
    return uppercase ? t.toUpperCase() : t;
}

const vigenereEncryptText = (text, key) => {
    key = keepLetters(key);
    let cipher = "",
        keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        let t = text.charAt(i);
        if (isLetter(t)) {
            k = key.charAt(keyIndex++ % key.length);
            c = vigenereEncryptChar(t, k);
            cipher += c;
        } else cipher += t;
    }
    return cipher;
};

const vigenereDecryptText = (cipher, key) => {
    key = keepLetters(key);
    let text = "",
        keyIndex = 0;
    for (let i = 0; i < cipher.length; ++i) {
        let c = cipher.charAt(i);
        if (isLetter(c)) {
            k = key.charAt(keyIndex++ % key.length);
            t = vigenereDecryptChar(c, k);
            text += t;
        } else {
            text += c;
        }
    }
    return text;
}


module.exports = { caesarEncrypt, caesarDecrypt, vigenereEncryptText, vigenereDecryptText };

// Testing
console.log(vigenereEncryptText("max", "abc"));
console.log(vigenereDecryptText(vigenereEncryptText("max", "abc"), "abc"));