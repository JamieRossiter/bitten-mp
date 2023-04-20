"use strict";
/**
 * @file extractPlayerInitData.ts
 * @description Functions for extracting player init data from a handshake query
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPlayerInitData = void 0;
const utils_1 = require("../utils");
function extractPlayerInitData(socket, req) {
    let url = "";
    if (req.url)
        url = req.url;
    const query = getQueryFromUrl(url);
    return validatePlayerInitData(query, socket);
}
exports.extractPlayerInitData = extractPlayerInitData;
function getQueryFromUrl(url) {
    let query = {};
    const rawParams = url.split("/?")[1].split("&");
    rawParams.forEach((param) => {
        if (param.includes("%20"))
            param = param.replace(/%20/g, " "); // Check if params include spaces
        const splitParam = param.split("=");
        query[splitParam[0]] = splitParam[1];
    });
    return query;
}
function validatePlayerInitData(query, socket) {
    const initData = {
        socket: socket,
        id: (0, utils_1.generateRandomAlphanumericalString)(10),
        username: `User#${(0, utils_1.generateRandomFixedInteger)(6)}`,
        isHost: false,
        room: ""
    };
    if ("username" in query) {
        if (query.username)
            initData.username = query.username.toString();
    }
    if ("isHost" in query) {
        initData.isHost = (query.isHost === "true"); // convert to boolean
    }
    if ("room" in query) {
        if (query.room)
            initData.room = query.room.toString();
    }
    return initData;
}
