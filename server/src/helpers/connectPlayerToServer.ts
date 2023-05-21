/**
 * @file handleServerConnection.ts
 * @description Functions for handling server connection
*/

import { Player, PlayerManager, Room, RoomManager } from "../classes";
import { IndividualMessageEventCode, BroadcastMessageEventCode } from "../enums";
import { logServerMessage } from "../utils";

export function connectPlayerToServer(playerManager: PlayerManager, roomManager: RoomManager, player: Player, room: Room): void {
    // Add player to server player list
    playerManager.addPlayer(player);

    // Log server message
    logServerMessage(`${player.username} (id:${player.id}) has connected to room ${room.code}!`);

    // Send an individual message to the player containing information about themselves
    player.sendMessage(IndividualMessageEventCode.PlayerInformation, { PlayerId: player.id, PlayerUsername: player.username })

    // Send a separate message to the player containing information about the room (i.e. who is in it)
    const playerData: {Id:  string, Username: string, Position: {x: number, y: number, dir: number}}[] = roomManager.getAllPlayersInRoom(room)
    .filter((playerInRoom: Player) => playerInRoom.id !== player.id )
    .map((otherPlayer: Player) => {
        return { Id: otherPlayer.id, Username: otherPlayer.username, Position: {x: otherPlayer.x, y: otherPlayer.y, dir: otherPlayer.dir }}
    });
    
    player.sendMessage(IndividualMessageEventCode.RoomInformation, { RoomCode: room.code, RoomPlayers: playerData });

    // Broadcast to room that player has connected to room
    roomManager.broadcastMessageToRoom(room, BroadcastMessageEventCode.PlayerJoinedRoom, { PlayerId: player.id, PlayerUsername: player.username, RoomCode: room.code }, player);
}

