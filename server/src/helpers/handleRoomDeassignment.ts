/**
 * @file handleRoomDeassignment.ts
 * @description Functions for handling deassignment of players from rooms
*/

import Server from "../classes/Server";
import Player from "../classes/Player";
import Room from "../classes/Room";

export function handleRoomDeassignment(server: Server, player: Player): void{
    const currentPlayerRoom: Room | undefined = server.getCurrentRoomOfPlayer(player);
    
    if(!currentPlayerRoom) return;
    let room: Room | undefined = currentPlayerRoom;
    if(!room) return;

    // Remove player from room if found
    server.removePlayerFromRoom(player, room);

    // Remove room from server if there are no players
    if(server.getCurrentPlayersInRoom(room).size <= 0){
        server.removeRoom(room);
    }
}