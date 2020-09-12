const keys = require("../keys.js");
const CryptoJS = require("crypto-js");

//Due for refactoring, add bcrypt support

const cryptoHelper = {

    encrypt: (data) => {
        return CryptoJS.AES.encrypt(data, keys.password).toString();
    },

    decrypt: (cipher) => {
        const bytes = CryptoJS.AES.decrypt(cipher, keys.password);
        return bytes.toString(CryptoJS.enc.Utf8);
    },

    encryptJSON: (data) => {
        const stringified = JSON.stringify(data);

        return CryptoJS.AES.encrypt(stringified, keys.password).toString();
    },

    decryptJSON: (cipher) => {
        const bytes = CryptoJS.AES.decrypt(cipher, keys.password);
        const stringified = bytes.toString(CryptoJS.enc.Utf8);

        return JSON.parse(stringified);
    }
}

module.exports = cryptoHelper;