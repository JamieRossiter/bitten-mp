/**
 * @file handleServerDisconnection.ts
 * @description Functions for handling server disconnection
*/

import Player from "../classes/Player";
import { logServerMessage } from "../utils";
import { PlayerDisconnectMessage } from "../types";
import Server from "../classes/Server";
import { MessageEventCode } from "../enums";
import Room from "../classes/Room";

export function handleServerDisconnection(server: Server, player: Player, closeCode: number): void{
    // Create a disconnect message
    const disconnectMessage: PlayerDisconnectMessage = createDisconnectMessage(player, closeCode);
    
    // Remove player from server player list
    server.removePlayer(player);
    
    // Broadcast the player disconnection
    const room: Room | undefined = server.getCurrentRoomOfPlayer(player);
    if(room) server.broadcastMessageToRoom(room, MessageEventCode.PlayerDisconnected, disconnectMessage);

    // Log a server message indicating player has disconnected
    logServerMessage(`${player.username}(id:${player.id}) has disconnected. Reason: ${disconnectMessage.message}(${disconnectMessage.code}).`);
}

function createDisconnectMessage(player: Player, closeCode: number): PlayerDisconnectMessage {

    let message: PlayerDisconnectMessage = { playerId: player.id, code: closeCode, message: "unknown"};

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