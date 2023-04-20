"use strict";
/**
 * @file handleServerConnection.ts
 * @description Functions for handling server connection
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerConnection = void 0;
const utils_1 = require("../utils");
function handleServerConnection(server, player) {
    // Add player to server player list
    server.addPlayer(player);
    // Log server message
    (0, utils_1.logServerMessage)(`${player.username}(id:${player.id}) has connected!`);
}
exports.handleServerConnection = handleServerConnection;
