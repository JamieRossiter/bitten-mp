/**
 * @file handleRoomAssignment.ts
 * @description Functions for handling assignment of players to rooms
*/

import { Player, Room } from "../classes";
import RoomManager from "../classes/RoomManager";
import { generateRandomAlphabeticalString } from "../utils";
import { MessageEventCode } from "../enums";

export function assignPlayerToRoom(roomManager: RoomManager, roomCode: string, player: Player): Room | undefined {
    
    let room: Room | undefined = roomManager.getRoomByCode(roomCode.toUpperCase());
    
    // If the player is joining an existing room
    if(room){
        roomManager.addPlayerToRoom(room, player);
        return room;
    }

    // If the player is creating a new room as a host
    if(player.isHost){
        room = new Room(generateRandomAlphabeticalString(6, "uppercase"), 8);
        roomManager.addRoom(room);
        roomManager.addPlayerToRoom(room, player);
        return room;
    }

    // If the player is attempting to join a room that doesn't exist, let them know
    player.sendMessage(MessageEventCode.RoomNoExist, { roomCode });
    return;

}