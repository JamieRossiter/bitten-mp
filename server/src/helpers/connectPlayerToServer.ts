/**
 * @file handleServerConnection.ts
 * @description Functions for handling server connection
*/

import { Player, PlayerManager, Room, RoomManager } from "../classes";
import { MessageEventCode } from "../enums";
import { logServerMessage } from "../utils";

export function connectPlayerToServer(playerManager: PlayerManager, roomManager: RoomManager, player: Player, room: Room): void {
    // Add player to server player list
    playerManager.addPlayer(player);

    // Log server message
    logServerMessage(`${player.username} (id:${player.id}) has connected to room ${room.code}!`);

    // Send an individual message to the player containing information about themselves
    player.sendMessage(MessageEventCode.PlayerInformation, { PlayerId: player.id, PlayerUsername: player.username })

    // Send a separate message to the player containing information about the room (i.e. who is in it)
    const playerData: {Id:  string, Username: string}[] = roomManager.getAllPlayersInRoom(room)
    .filter((playerInRoom: Player) => playerInRoom.id !== player.id )
    .map((otherPlayer: Player) => {
        return { Id: otherPlayer.id, Username: otherPlayer.username }
    });
    
    player.sendMessage(MessageEventCode.RoomInformation, { RoomCode: room.code, RoomPlayers: playerData });

    // Broadcast to room that player has connected to room
    roomManager.broadcastMessageToRoom(room, MessageEventCode.PlayerJoinedRoom, { PlayerId: player.id, PlayerUsername: player.username, RoomCode: room.code }, player);
}

