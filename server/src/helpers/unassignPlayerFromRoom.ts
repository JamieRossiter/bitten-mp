/**
 * @file handleRoomDeassignment.ts
 * @description Functions for handling deassignment of players from rooms
*/

import { Player, Room } from "../classes";
import RoomManager from "../classes/RoomManager";
import { MessageEventCode } from "../enums";

export function unassignPlayerFromRoom(roomManager: RoomManager, room: Room,  player: Player, closeCode: number): void{
    
    // Create an unassignment message
    const unassignmentMessage: { playerId: string, code: number, message: string} = createUnassignmentMessage(player, closeCode);

    // Remove player from room 
    try{
        roomManager.removePlayerFromRoom(room, player);
    } catch(e: any) {
        console.error(e);
        return;
    }
    
    // Broadcast the player unassignment
    roomManager.broadcastMessageToRoom(room, MessageEventCode.PlayerLeftRoom, unassignmentMessage);

    // Remove room from server if there are no players
    if(roomManager.getAllPlayersInRoom(room).length <= 0){
        roomManager.removeRoom(room);
    }
    
}

function createUnassignmentMessage(player: Player, closeCode: number): { playerId: string, code: number, message: string} {

    let message: { playerId: string, code: number, message: string} = { playerId: player.id, code: closeCode, message: "unknown"};

    switch(closeCode){
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