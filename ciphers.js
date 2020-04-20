const caesarEncrypt = (str, amount) => {

    if (!Number.isInteger(amount)) {
        throw Error("Amount should be integer");
    }

    // Wrap the amount
    if (amount < 0) {
        return caesarEncrypt(str, amount + 26);
    }

    if (typeof(str) !== "string") {
        throw Error("String or number expected");
    }

    // Make an output letiable
    let output = "";

    // Go through each character
    for (let i = 0; i < str.length; i++) {

        // Get the character we'll be appending
        let c = str[parseInt(i)];

        // If it's a letter...
        if (c.match(/[a-z]/i)) {

            // Get its code
            let code = str.charCodeAt(i);

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

module.exports = { caesarEncrypt, caesarDecrypt };