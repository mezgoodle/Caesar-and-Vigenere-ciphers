'use strict';

const typeDefine = {
  'cyr': { 'AlphaNum': 32, 'StartCodeU': 1040,
    'FinishCodeU': 1071, 'StartCodeL': 1072, 'FinishCodeL': 1105 },
  'lat': { 'AlphaNum': 26, 'StartCodeU': 65,
    'FinishCodeU': 90, 'StartCodeL': 97, 'FinishCodeL': 122 },
  'gre': { 'AlphaNum': 25, 'StartCodeU': 913,
    'FinishCodeU': 937, 'StartCodeL': 945, 'FinishCodeL': 969 },
};

const keepLetters = s => (s.replace(/[^a-zA-Zа-яА-Яα-ωΑ-Ω]+/g, ''));
const isLetter = c => (c.match(/[a-zA-Zа-яА-Яα-ωΑ-Ω]+/));
const isUpperCase = c => (c.match(/[A-ZА-ЯΑ-Ω]+/));

const caesarEncrypt = (text = null, amount = null, type = null) => {
  if (typeof(amount) !== 'number') throw Error('Amount should be integer and not empty');
  if (text === null) throw Error('Message should be not empty');
  if (typeof(text) !== 'string') throw Error('Text must be String');
  // Type define
  if (!Object.prototype.hasOwnProperty.call(typeDefine, type))
    throw Error('Type must be "lat" or "cyr"');
  const { AlphaNum, StartCodeU, FinishCodeU, StartCodeL, FinishCodeL } = typeDefine[type];
  // Wrap the amount
  if (amount < 0) return caesarEncrypt(text, amount + AlphaNum, type);

  let output = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (isLetter(char)) {
      // Get its code
      const code = text.charCodeAt(i);
      // lowercase letters
      if ((code >= StartCodeL) && (code <= FinishCodeL))
        char = String.fromCharCode(((code - StartCodeL + amount) % AlphaNum) + StartCodeL);
      // Uppercase letters
      else if ((code >= StartCodeU) && (code <= FinishCodeU))
        char = String.fromCharCode(((code - StartCodeU + amount) % AlphaNum) + StartCodeU);
    }
    output += char;
  }
  return output;
};

const caesarDecrypt = (text, shift, type) => {
  if (!Object.prototype.hasOwnProperty.call(typeDefine, type))
    throw Error('Type must be "lat" or "cyr"');
  const { AlphaNum } = typeDefine[type];
  let result = '';
  shift = (AlphaNum - shift) % AlphaNum;
  result = caesarEncrypt(text, shift, type);
  return result;
};

// Worker for single char in Vigenere algorithm
const workerChar = (char, key, type = 'e', lang) => {
  if (!isLetter(char) || !isLetter(key)) return char;
  const uppercase = isUpperCase(char);
  char = char.toLowerCase().charCodeAt(0);
  key = key.toLowerCase().charCodeAt(0);
  const { AlphaNum, StartCodeU, StartCodeL } = typeDefine[lang];
  const a = StartCodeL;
  const A = StartCodeU;
  if (type === 'd') {
    let temp = a + ((char - a) - (key - a));
    if (temp < a) temp += AlphaNum;
    temp = String.fromCharCode(temp);
    return uppercase ? temp.toUpperCase() : temp;
  } else return String.fromCharCode((uppercase ? A : a) + (((char - a) + (key - a)) % AlphaNum));
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
