/**
 * @file handleServerConnection.ts
 * @description Functions for handling server connection
*/

import { Player, PlayerManager, Room } from "../classes";
import { logServerMessage } from "../utils";

export function connectPlayerToServer(playerManager: PlayerManager, player: Player, room: Room): void {
    // Add player to server player list
    playerManager.addPlayer(player);
    // Log server message
    logServerMessage(`${player.username}(id:${player.id}) has connected to room ${room.code}!`);
}

