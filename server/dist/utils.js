"use strict";
/**
 * @file  utils.ts
 * @description Utility functions
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomAlphabeticalString = exports.generateRandomAlphanumericalString = exports.generateRandomFixedInteger = exports.logServerMessage = void 0;
function logServerMessage(message, data) {
    if (data) {
        console.log(`[Infection MP] ${message}`, data);
        return;
    }
    console.log(`[Infection MP] ${message}`);
}
exports.logServerMessage = logServerMessage;
function generateRandomFixedInteger(length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}
exports.generateRandomFixedInteger = generateRandomFixedInteger;
function generateRandomAlphanumericalString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
exports.generateRandomAlphanumericalString = generateRandomAlphanumericalString;
function generateRandomAlphabeticalString(length, letterCase) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var result = "";
    for (var i = 0; i < length; ++i) {
        result += alphabet[Math.floor(alphabet.length * Math.random())];
    }
    if (letterCase === "uppercase")
        result = result.toUpperCase();
    else if (letterCase === "lowercase")
        result = result.toLowerCase();
    else
        result = result;
    return result;
}
exports.generateRandomAlphabeticalString = generateRandomAlphabeticalString;
