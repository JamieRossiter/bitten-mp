/**
 * @file handleServerDisconnection.ts
 * @description Functions for handling server disconnection
*/

import { Player, PlayerManager } from "../classes";
import { logServerMessage } from "../utils";
import { MessageEventCode } from "../enums";

export function disconnectPlayerFromServer(playerManager: PlayerManager, player: Player, closeCode: number): void{
    
    // Remove player from server player list
    playerManager.removePlayer(player);

    // Log a server message indicating player has disconnected
    logServerMessage(`${player.username}(id:${player.id}) has disconnected (${closeCode})`);
}