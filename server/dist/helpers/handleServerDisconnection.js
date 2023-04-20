"use strict";
/**
 * @file handleServerDisconnection.ts
 * @description Functions for handling server disconnection
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerDisconnection = void 0;
const utils_1 = require("../utils");
const enums_1 = require("../enums");
function handleServerDisconnection(server, player, closeCode) {
    // Create a disconnect message
    const disconnectMessage = createDisconnectMessage(player, closeCode);
    // Remove player from server player list
    server.removePlayer(player);
    // Broadcast the player disconnection
    const room = server.getCurrentRoomOfPlayer(player);
    if (room)
        server.broadcastMessageToRoom(room, enums_1.MessageEventCode.PlayerDisconnected, disconnectMessage);
    // Log a server message indicating player has disconnected
    (0, utils_1.logServerMessage)(`${player.username}(id:${player.id}) has disconnected. Reason: ${disconnectMessage.message}(${disconnectMessage.code}).`);
}
exports.handleServerDisconnection = handleServerDisconnection;
function createDisconnectMessage(player, closeCode) {
    let message = { playerId: player.id, code: closeCode, message: "unknown" };
    switch (closeCode) {
        case 1000:
        case 1001:
            message.message = "player left";
            break;
        case 1005:
            message.message = "player disconnected for an unknown reason";
            break;
        case 1011:
            message.message = "server error";
            break;
        case 1012:
            message.message = "server restart";
            break;
        case 4000:
            message.message = "player was kicked";
            break;
        default:
            message.message = "miscellaneous/unknown error";
            break;
    }
    return message;
}
