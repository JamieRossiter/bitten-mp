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
            processIndividualClientMessage(event as IndividualMessageEventCode, messageData, playerManager);
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

    let broadcastingPlayer: Player | undefined;

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

            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);
            broadcastingPlayer?.setX(message.X);
            broadcastingPlayer?.setY(message.Y);
            broadcastingPlayer?.setDirection(message.Dir);

            break;
        case BroadcastMessageEventCode.ChatMessage:
    
            if(!("PlayerId" in message || "ChatMessage" in message)){
                // Handle error
                return;
            }

            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);

            break;
        case BroadcastMessageEventCode.PlayerIsTyping:

            if(!("PlayerId" in message || "IsTyping" in message)) return;

            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);

            break;

        case BroadcastMessageEventCode.PlayerAssignedRole:

            if(!("PlayerId" in message || "Role" in message)){
                // Handle error
                return;
            }

            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);

        break;
        
        case BroadcastMessageEventCode.MapTransfer:
                        
            if(!("HostId" in message || "MapId" in message || "X" in message || "Y" in message || "Dir" in message)){
                // Handle error
                return;
            }

            broadcastingPlayer = playerManager.getPlayerById(message.HostId);
            
        break;
    }

    roomManager.broadcastMessageToRoom(targetRoom, event, message, broadcastingPlayer);
}

function processIndividualClientMessage(event: IndividualMessageEventCode, messageData: any, playerManager: PlayerManager){
    
    if(!("PlayerId" in messageData)){
        // Handle error
        return;
    }

    // Declare player
    const player: Player | undefined = playerManager.getPlayerById(messageData.PlayerId);
    if(!player){
        // Handle error
        return;
    }

    // Extract message
    const message: any = messageData.Message;
    if(!message){
        // Handle error
        return;
    }

}