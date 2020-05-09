# Caesar and Vigenere ciphers

Hello everyone! This is the repository of my package on JavaScript "Caesar and Vigenere ciphers"

## Motivation

I've always been interested in the topic of data encryption, but I didn't delve deeply into it. So I decided to do it on. At first there was an idea to do a [*CLI*](https://en.wikipedia.org/wiki/Command-line_interface) or an *[Electron](https://www.electronjs.org/) application*. But later it turned into a package for [*npm*](https://www.npmjs.com/).

## Build status

Here you can build status of [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)/[continuous deployment](https://en.wikipedia.org/wiki/Continuous_deployment):

![Node.js Package](https://github.com/mezgoodle/Caesar-and-Vigenere-ciphers/workflows/Node.js%20Package/badge.svg)
[![Build Status](https://travis-ci.com/mezgoodle/Caesar-and-Vigenere-ciphers.svg?branch=master)](https://travis-ci.com/mezgoodle/Caesar-and-Vigenere-ciphers)
[![pipeline status](https://gitlab.com/Zavalniuk/Caesar-and-Vigenere-ciphers/badges/master/pipeline.svg)](https://gitlab.com/Zavalniuk/Caesar-and-Vigenere-ciphers/-/commits/master)
[![Build Status](https://dev.azure.com/mezgoodle/mezgoodle/_apis/build/status/mezgoodle.Caesar-and-Vigenere-ciphers?branchName=master)](https://dev.azure.com/mezgoodle/mezgoodle/_build/latest?definitionId=2&branchName=master)
![node-current](https://img.shields.io/node/v/jest)

## Code style

I'm using [Codacy](https://www.codacy.com/) for automate my code quality.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c4a0fd48cea64b4aa06936c12d853856)](https://www.codacy.com/manual/mezgoodle/Caesar-and-Vigenere-ciphers?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mezgoodle/Caesar-and-Vigenere-ciphers&amp;utm_campaign=Badge_Grade)

## Dependencies 

I'm using only [jest](https://jestjs.io/) for testing, but that's enough for unit-testing. You may not install it.

>You can see all dependencies from `package-lock.json` [here](https://github.com/mezgoodle/Caesar-and-Vigenere-ciphers/network/dependencies).

## Features

With my package you can encrypt / decrypt text with Caesar and Wiegener  algorithms.

## Installation

First install [Node.js](https://nodejs.org/uk/). Then:

```bash
npm i @mezgoodle/caesar-and-vigenere-ciphers --save
```

## Importing

```js
// Using Node.js `require()`
const { caesarEncrypt, caesarDecrypt, vigenereEncryptText, vigenereDecryptText } = require("@mezgoodle/caesar-and-vigenere-ciphers");
```

## Fast usage

```js
console.log(caesarEncrypt("pellentesque", 12));
// expected output: bqxxqzfqecgq
console.log(caesarDecrypt("pellentesque", -12));
// expected output: bqxxqzfqecgq
console.log(vigenereEncryptText("unopinionated", "express"));
// expected output: ykdgmfaskpkiv
console.log(vigenereDecryptText("ykdgmfaskpkiv", "express"));
// expected output: unopinionated
```

## API

### caesarEncrypt( value, amount )

Name    | Type     | Argument     | Default | Description
--------|----------|--------------|---------|------------
value     | `string` | `<required>` | `null`  | the message to encrypt
amount | `number` | `<required>` | `null`  | the key to encrypt the message with

### caesarDecrypt( value, amount )

Name    | Type     | Argument     | Default | Description
--------|----------|--------------|---------|------------
value     | `string` | `<required>` | `null`  | the message to decrypt
amount | `number` | `<required>` | `null`  | the key to decrypt the message with

### vigenereEncryptText( text, key )

Name    | Type     | Argument     | Default | Description
--------|----------|--------------|---------|------------
text     | `string` | `<required>` | `null`  | the message to encrypt
key | `string` | `<required>` | `null`  | the key to encrypt the message with

### vigenereDecryptText( text, key )

Name    | Type     | Argument     | Default | Description
--------|----------|--------------|---------|------------
text     | `string` | `<required>` | `null`  | the message to decrypt
key | `string` | `<required>` | `null`  | the key to decrypt the message with


## Code Example

Here you can see small example of Vigenere worker

```js
const worker = (str, key, type) => {
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
```

## Tests

Unit-testing with **assert** and **jest**:

![Test-1](https://github.com/mezgoodle/images/blob/master/Caesar-and-Vigenere-ciphers-1.png)

![Test-2](https://github.com/mezgoodle/images/blob/master/Caesar-and-Vigenere-ciphers-2.png)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

![GitHub](https://img.shields.io/github/license/mezgoodle/Caesar-and-Vigenere-ciphers)

MIT © [mezgoodle](https://github.com/mezgoodle)