"use strict";
/**
 * @file handleRoomAssignment.ts
 * @description Functions for handling assignment of players to rooms
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomAssignment = void 0;
const Room_1 = __importDefault(require("../classes/Room"));
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const handleServerDisconnection_1 = require("./handleServerDisconnection");
function handleRoomAssignment(server, roomCode, player) {
    let room = server.findRoomByCode(roomCode.toUpperCase());
    // If the player is joining an existing room
    if (room) {
        server.addPlayerToRoom(player, room);
        return;
    }
    // If the player is creating a new room as a host
    if (player.isHost) {
        room = new Room_1.default((0, utils_1.generateRandomAlphabeticalString)(6, "uppercase"), 8);
        server.addRoom(room);
        server.addPlayerToRoom(player, room);
        return;
    }
    // If the player is attempting to join a room that doesn't exist, let them know and kick them
    player.sendMessage(enums_1.MessageEventCode.RoomNoExist, { roomCode });
    (0, handleServerDisconnection_1.handleServerDisconnection)(server, player, 4000);
}
exports.handleRoomAssignment = handleRoomAssignment;
