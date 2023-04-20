"use strict";
/**
 * @file handleRoomDeassignment.ts
 * @description Functions for handling deassignment of players from rooms
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomDeassignment = void 0;
function handleRoomDeassignment(server, player) {
    const currentPlayerRoom = server.getCurrentRoomOfPlayer(player);
    if (!currentPlayerRoom)
        return;
    let room = currentPlayerRoom;
    if (!room)
        return;
    // Remove player from room if found
    server.removePlayerFromRoom(player, room);
    // Remove room from server if there are no players
    if (server.getCurrentPlayersInRoom(room).size <= 0) {
        server.removeRoom(room);
    }
}
exports.handleRoomDeassignment = handleRoomDeassignment;
