/**
 * @file handleRoomDeassignment.ts
 * @description Functions for handling deassignment of players from rooms
*/

import { Player, Room } from "../classes";
import RoomManager from "../classes/RoomManager";
import { BroadcastMessageEventCode } from "../enums";

export function unassignPlayerFromRoom(roomManager: RoomManager, room: Room,  player: Player, closeCode: number): void{
    
    // Create an unassignment message
    const unassignmentMessage: { 
        PlayerId: string, 
        PlayerUsername: string,
        DisconnectCode: number, 
        DisconnectMessage: string,
        RoomCode: string
    } = createUnassignmentMessage(player, room.code, closeCode);

    // Remove player from room 
    try{
        roomManager.removePlayerFromRoom(room, player);
    } catch(e: any) {
        console.error(e);
        return;
    }
    
    // Broadcast the player unassignment
    roomManager.broadcastMessageToRoom(room, BroadcastMessageEventCode.PlayerLeftRoom, unassignmentMessage);

    // Remove room from server if there are no players
    // if(roomManager.getAllPlayersInRoom(room).length <= 0){
    //     roomManager.removeRoom(room);
    // }
    
}

function createUnassignmentMessage(player: Player, roomCode: string, closeCode: number): { PlayerId: string, PlayerUsername: string, DisconnectCode: number, DisconnectMessage: string, RoomCode: string} {

    let message: { 
        PlayerId: string,
        PlayerUsername: string, 
        DisconnectCode: number, 
        DisconnectMessage: string,
        RoomCode: string
    } = { PlayerId: player.id, PlayerUsername: player.username, DisconnectCode: closeCode, DisconnectMessage: "unknown", RoomCode: roomCode};

    switch(closeCode){
        case 1000:
        case 1001:
            message.DisconnectMessage = "player left";
            break;
        case 1005:
            message.DisconnectMessage = "player disconnected for an unknown reason";
            break;
        case 1011:
            message.DisconnectMessage = "server error";
            break;
        case 1012:
            message.DisconnectMessage = "server restart";
            break;
        case 4000:
            message.DisconnectMessage = "player was kicked";
            break;
        default:
            message.DisconnectMessage = "miscellaneous/unknown error";
            break;
    }
    
    return message;

}