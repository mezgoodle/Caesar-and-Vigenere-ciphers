# Caesar and Vigenere ciphers
This is the repository of my project on topic: "Caesar and Vigenere ciphers"

![Node.js Package](https://github.com/mezgoodle/Caesar-and-Vigenere-ciphers/workflows/Node.js%20Package/badge.svg)
[![Build Status](https://travis-ci.com/mezgoodle/Caesar-and-Vigenere-ciphers.svg?branch=master)](https://travis-ci.com/mezgoodle/Caesar-and-Vigenere-ciphers)
[![pipeline status](https://gitlab.com/Zavalniuk/Caesar-and-Vigenere-ciphers/badges/master/pipeline.svg)](https://gitlab.com/Zavalniuk/Caesar-and-Vigenere-ciphers/-/commits/master)
![node-current](https://img.shields.io/node/v/jest)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c4a0fd48cea64b4aa06936c12d853856)](https://www.codacy.com/manual/mezgoodle/Caesar-and-Vigenere-ciphers?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mezgoodle/Caesar-and-Vigenere-ciphers&amp;utm_campaign=Badge_Grade)

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