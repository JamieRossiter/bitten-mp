/**
 * @file handleServerConnection.ts
 * @description Functions for handling server connection
*/

import Player from "../classes/Player";
import { logServerMessage } from "../utils";
import Server from "../classes/Server";


export function handleServerConnection(server: Server, player: Player): void {
    // Add player to server player list
    server.addPlayer(player);
    
    // Log server message
    logServerMessage(`${player.username}(id:${player.id}) has connected!`);
}

