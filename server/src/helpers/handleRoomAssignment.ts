/**
 * @file handleRoomAssignment.ts
 * @description Functions for handling assignment of players to rooms
*/

import Player from "../classes/Player";
import Room from "../classes/Room";
import Server from "../classes/Server";
import { generateRandomAlphabeticalString } from "../utils";
import { MessageEventCode } from "../enums";
import { handleServerDisconnection } from "./handleServerDisconnection";

export function handleRoomAssignment(server: Server, roomCode: string, player: Player): void {
    
    let room: Room | undefined = server.findRoomByCode(roomCode.toUpperCase());
    
    // If the player is joining an existing room
    if(room){
        server.addPlayerToRoom(player, room);
        return;
    }

    // If the player is creating a new room as a host
    if(player.isHost){
        room = new Room(generateRandomAlphabeticalString(6, "uppercase"), 8);
        server.addRoom(room);
        server.addPlayerToRoom(player, room);
        return;
    }

    // If the player is attempting to join a room that doesn't exist, let them know and kick them
    player.sendMessage(MessageEventCode.RoomNoExist, { roomCode });
    handleServerDisconnection(server, player, 4000);
}