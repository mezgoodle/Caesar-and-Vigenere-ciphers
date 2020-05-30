'use strict';

const typeDefine = {
  'cyr': { alpha_num: 32, start_code_u: 1040,
    finish_code_u: 1071, start_code_l: 1072, finish_code_l: 1105 },
  'lat': { alpha_num: 26, start_code_u: 65,
    finish_code_u: 90, start_code_l: 97, finish_code_l: 122 },
};

const keepLetters = s => (s.replace(/[^a-zA-Zа-яА-Я]+/g, ''));
const isLetter = c => (c.match(/[a-zA-Zа-яА-Я]+/));
const isUpperCase = c => (c.match(/[A-ZА-Я]+/));

const caesarEncrypt = (text = null, amount = null, type = null) => {
  if (typeof(amount) !== 'number') throw Error('Amount must be number');
  if (text === null) throw Error('Message should be not empty');
  if (!Number.isInteger(amount) || amount === null)
    throw Error('Amount should be integer and not empty');
  if (typeof(text) !== 'string') throw Error('Text must be String');
  // Type define
  if (!Object.prototype.hasOwnProperty.call(typeDefine, type))
    throw Error('Type must be "lat" or "cyr"');
  const { alpha_num, start_code_u, finish_code_u, start_code_l, finish_code_l } = typeDefine[type];
  // Wrap the amount
  if (amount < 0) return caesarEncrypt(text, amount + alpha_num, type);

  // Make an output letiable
  let output = '';
  // Go through each character
  for (let i = 0; i < text.length; i++) {
    // Get the character we'll be appending
    let c = text[parseInt(i)];
    // If it's a letter...
    if (isLetter(c)) {
      // Get its code
      const code = text.charCodeAt(i);
      // lowercase letters
      if ((code >= start_code_l) && (code <= finish_code_l))
        c = String.fromCharCode(((code - start_code_l + amount) % alpha_num) + start_code_l);
      // Uppercase letters
      else if ((code >= start_code_u) && (code <= finish_code_u))
        c = String.fromCharCode(((code - start_code_u + amount) % alpha_num) + start_code_u);
    }
    // Append
    output += c;
  }
  // All done!
  return output;
};

const caesarDecrypt = (text, shift, type) => {
  if (!Object.prototype.hasOwnProperty.call(typeDefine, type))
    throw Error('Type must be "lat" or "cyr"');
  const { alpha_num } = typeDefine[type];
  let result = '';
  shift = (alpha_num - shift) % alpha_num;
  result = caesarEncrypt(text, shift, type);
  return result;
};

const workerChar = (char, k, type = 'e', lang) => {
  if (!isLetter(char) || !isLetter(k)) return char;
  const uppercase = isUpperCase(char);
  char = char.toLowerCase().charCodeAt(0);
  k = k.toLowerCase().charCodeAt(0);
  const { alpha_num, start_code_u, start_code_l } = typeDefine[lang];
  const a = start_code_l;
  const A = start_code_u;
  if (type === 'd') {
    let t = a + ((char - a) - (k - a));
    if (t < a) t += alpha_num;
    t = String.fromCharCode(t);
    return uppercase ? t.toUpperCase() : t;
  } else return String.fromCharCode((uppercase ? A : a) + (((char - a) + (k - a)) % alpha_num));
};

const worker = (str, key, type, lang) => {
  if (typeof(key) !== 'string' || typeof(str) !== 'string')
    throw Error('Text and Key must be string');
  if (!Object.prototype.hasOwnProperty.call(typeDefine, type))
    throw Error('Type must be "lat" or "cyr"');
  if (str === null || key === null) throw Error('Message and key should be not empty');
  key = keepLetters(key);
  let result = '',
    keyIndex = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (isLetter(char)) {
      const k = key.charAt(keyIndex++ % key.length);
      const temp = workerChar(char, k, type, lang);
      result += temp;
    } else {
      result += char;
    }
  }
  return result;
};

const vigenereEncryptText = (text = null, key = null, type = null) =>
  (worker(text, key, 'e', type));

const vigenereDecryptText = (cipher = null, key = null, type = null) =>
  (worker(cipher, key, 'd', type));

module.exports = { caesarEncrypt, caesarDecrypt, vigenereEncryptText, vigenereDecryptText };
