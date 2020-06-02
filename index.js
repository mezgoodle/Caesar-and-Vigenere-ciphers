'use strict';

const typeDefine = {
  'cyr': { 'alpha_num': 32, 'start_code_u': 1040,
    'finish_code_u': 1071, 'start_code_l': 1072, 'finish_code_l': 1105 },
  'lat': { 'alpha_num': 26, 'start_code_u': 65,
    'finish_code_u': 90, 'start_code_l': 97, 'finish_code_l': 122 },
  'gre': { 'alpha_num': 24, 'start_code_u': 913,
    'finish_code_u': 937, 'start_code_l': 945, 'finish_code_l': 969 },
};

const keepLetters = s => (s.replace(/[^a-zA-Zа-яА-Я]+/g, ''));
const isLetter = c => (c.match(/[a-zA-Zа-яА-Я]+/));
const isUpperCase = c => (c.match(/[A-ZА-Я]+/));

const caesarEncrypt = (text = null, amount = null, type = null) => {
  if (typeof(amount) !== 'number') throw Error('Amount should be integer and not empty');
  if (text === null) throw Error('Message should be not empty');
  if (typeof(text) !== 'string') throw Error('Text must be String');
  // Type define
  if (!Object.prototype.hasOwnProperty.call(typeDefine, type))
    throw Error('Type must be "lat" or "cyr"');
  const { alpha_num, start_code_u, finish_code_u, start_code_l, finish_code_l } = typeDefine[type];
  // Wrap the amount
  if (amount < 0) return caesarEncrypt(text, amount + alpha_num, type);

  let output = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (isLetter(char)) {
      // Get its code
      const code = text.charCodeAt(i);
      // lowercase letters
      if ((code >= start_code_l) && (code <= finish_code_l))
        char = String.fromCharCode(((code - start_code_l + amount) % alpha_num) + start_code_l);
      // Uppercase letters
      else if ((code >= start_code_u) && (code <= finish_code_u))
        char = String.fromCharCode(((code - start_code_u + amount) % alpha_num) + start_code_u);
    }
    output += char;
  }
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

// Worker for single char in Vigenere algorithm
const workerChar = (char, key, type = 'e', lang) => {
  if (!isLetter(char) || !isLetter(key)) return char;
  const uppercase = isUpperCase(char);
  char = char.toLowerCase().charCodeAt(0);
  key = key.toLowerCase().charCodeAt(0);
  const { alpha_num, start_code_u, start_code_l } = typeDefine[lang];
  const a = start_code_l;
  const A = start_code_u;
  if (type === 'd') {
    let temp = a + ((char - a) - (key - a));
    if (temp < a) temp += alpha_num;
    temp = String.fromCharCode(temp);
    return uppercase ? temp.toUpperCase() : temp;
  } else return String.fromCharCode((uppercase ? A : a) + (((char - a) + (key - a)) % alpha_num));
};

// Worker for Vigenere algorithm
const worker = (str, key, type, lang) => {
  if (typeof(key) !== 'string' || typeof(str) !== 'string')
    throw Error('Text and Key must be string');
  if (!Object.prototype.hasOwnProperty.call(typeDefine, lang))
    throw Error('Type must be "lat" or "cyr"');
  if (str === null || key === null) throw Error('Message and key should be not empty');
  key = keepLetters(key);
  let result = '',
    keyIndex = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (isLetter(char)) {
      const key_el = key.charAt(keyIndex++ % key.length);
      const temp = workerChar(char, key_el, type, lang);
      result += temp;
    } else {
      result += char;
    }
  }
  return result;
};

const vigenereEncrypt = (text = null, key = null, lang = null) =>
  (worker(text, key, 'e', lang));

const vigenereDecrypt = (cipher = null, key = null, lang = null) =>
  (worker(cipher, key, 'd', lang));

module.exports = { caesarEncrypt, caesarDecrypt, vigenereEncrypt, vigenereDecrypt };
