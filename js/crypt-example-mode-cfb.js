// npm install crypto-js -g

'use strict';

var AES = require("crypto-js/aes");
var CryptoJS = require("./crypto-js/cfb.js")

function aesEncryptModeCFB (msg, key, iv) {
    return AES.encrypt(msg, key, {iv: iv, mode: CryptoJS.mode.CFB}).toString()
}

function aesDecryptModeCFB (cipher, key, iv) {
    return AES.decrypt(cipher, key, {iv: iv, mode: CryptoJS.mode.CFB}).toString(CryptoJS.enc.Utf8);
}

var encrypted = {
    "key": '01ab38d5e05c92aa098921d9d4626107133c7e2ab0e4849558921ebcc242bcb0',
    "iv": '6aa60df8ff95955ec605d5689036ee88',
    "ciphertext": 'r19YcF8gc8bgk5NNui6I3w=='
}

var key = CryptoJS.enc.Hex.parse(encrypted.key)
var iv = CryptoJS.enc.Hex.parse(encrypted.iv)
var cipher = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(encrypted.ciphertext)
})

console.log(aesDecryptModeCFB(cipher, key, iv))
// => fisproject
console.log(aesEncryptModeCFB('fisproject', key, iv))
// => r19YcF8gc8bgk5NNui6I3w==