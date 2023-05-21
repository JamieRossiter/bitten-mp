/**
 * @file handleClientMessage.ts
 * @description Functions for handling client messages
*/

import { Player, PlayerManager, Room, RoomManager } from "../classes";
import { BroadcastMessageEventCode, IndividualMessageEventCode, MessageType } from "../enums";

export function processClientMessage(messageData: any, roomManager: RoomManager, playerManager: PlayerManager): void{

    if(!("Type" in messageData || "Event" in messageData || "Message" in messageData || "RoomCode" in messageData)){
        // Handle error
        return;
    }
    
    const type: MessageType = messageData.Type;
    const event: IndividualMessageEventCode | BroadcastMessageEventCode = messageData.Event;

    switch(type){
        case MessageType.Broadcast:
            processBroadcastClientMessage(event as BroadcastMessageEventCode, messageData, roomManager, playerManager);
            break;
        case MessageType.Individual:
            break;
        case MessageType.Server:
            break;
    }
}

function processBroadcastClientMessage(event: BroadcastMessageEventCode, messageData: any, roomManager: RoomManager, playerManager: PlayerManager){

    const targetRoom: Room | undefined = roomManager.getRoomByCode(messageData.RoomCode);
    if(!targetRoom){
        // Handle error
        return;
    }

    const message: any = messageData.Message;
    if(!message){
        // Handle error
        return;
    }

    switch(event){
        case BroadcastMessageEventCode.PlayerMoveStraight:
            
            if(!("PlayerId" in message || "X" in message || "Y" in message || "Dir" in message)){
                // Handle error
                return;
            }
            
            const player: Player | undefined = playerManager.getPlayerById(message.PlayerId);
            if(!player) return;
            player.setX(message.X);
            player.setY(message.Y);
            player.setDirection(message.Dir);

            roomManager.broadcastMessageToRoom(targetRoom, event, message, player);
            break;
    }
}