// npm install crypto-js -g

'use strict';

var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

/**
 * Cipher Feedback block mode.
 */
CryptoJS.mode.CFB = (function () {
    var CFB = CryptoJS.lib.BlockCipherMode.extend();

    CFB.Encryptor = CFB.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;

            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

            // Remember this block to use with next block
            this._prevBlock = words.slice(offset, offset + blockSize);
        }
    });

    CFB.Decryptor = CFB.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;

            // Remember this block to use with next block
            var thisBlock = words.slice(offset, offset + blockSize);

            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

            // This block becomes the previous block
            this._prevBlock = thisBlock;
        }
    });

    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
        // Shortcut
        var iv = this._iv;

        // Generate keystream
        if (iv) {
            var keystream = iv.slice(0);

            // Remove IV for subsequent blocks
            this._iv = undefined;
        } else {
            var keystream = this._prevBlock;
        }
        cipher.encryptBlock(keystream, 0);

        // Encrypt
        for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
        }
    }

    return CFB;
}());

function aesEnccryptModeCFB (msg, key, iv) {
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
console.log(aesEnccryptModeCFB('fisproject', key, iv))
// => r19YcF8gc8bgk5NNui6I3w==