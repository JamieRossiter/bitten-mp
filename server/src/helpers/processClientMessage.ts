/**
 * @file handleClientMessage.ts
 * @description Functions for handling client messages
*/

import { Player, PlayerManager, Room, RoomManager } from "../classes";
import { Npc } from "../classes/Npc";
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
    let targetPlayer: Player | undefined;
    let targetNpc: Npc | undefined;

    const message: any = messageData.Message;
    if(!message){
        // Handle error
        return;
    }

    switch(event){
        case BroadcastMessageEventCode.PlayerIsMoving:

            if(!("PlayerId" in message || "Dir" in message || "IsMoving" in message || "X" in message || "Y" in message)){
                // Handle error
                return;
            }

            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);
            if(!broadcastingPlayer){
                // Handle error
                return;
            }
            broadcastingPlayer.setX(message.X);
            broadcastingPlayer.setY(message.Y);

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

        case BroadcastMessageEventCode.RoleInformation:

            if(!("PlayerId" in message || "TargetPlayerId" in message || "Role" in message)){
                // Handle error
                return;
            }

            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);
            targetPlayer = playerManager.getPlayerById(message.TargetPlayerId);
            if(!targetPlayer){
                // Handle error
                return;
            }
            targetPlayer.setRole(message.Role);

        break;
        
        case BroadcastMessageEventCode.MapTransfer:
                        
            if(!("HostId" in message || "MapId" in message || "X" in message || "Y" in message || "Dir" in message)){
                // Handle error
                return;
            }

            broadcastingPlayer = playerManager.getPlayerById(message.HostId);
            
        break;

        case BroadcastMessageEventCode.ActivateNpcs:

            if(!("HostId" in message || "NpcData" in message)){
                // Handle error
                return;
            }

            message.NpcData.forEach((data: any) => {
                
                if(!("Id" in data || "Path" in data)){
                    // Handle error
                    return;
                }
                targetRoom.addNpc(new Npc(data.Id, data.Path));

            })

            broadcastingPlayer = playerManager.getPlayerById(message.HostId);
        break;

        case BroadcastMessageEventCode.NpcStateChange:

            if(!("PlayerId" in message || "NpcId" in message || "TargetState" in message)){
                // Handle error
                return;
            }

            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);
            
            targetNpc = targetRoom.getNpcById(parseInt(message.NpcId));
            if(!targetNpc){
                // Handle error
                return;
            }
            targetNpc.setState(message.TargetState);
        break;

        case BroadcastMessageEventCode.TogglePlayerDisguise:

            if(!("PlayerId" in message || "IsDisguised" in message)){
                // Handle error
                return;
            }

            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);

        break;

        case BroadcastMessageEventCode.PlayerDeath:

            if(!("PlayerId" in message || "TargetPlayerId" in message)){
                // Handle error
                return;
            }

            targetPlayer = playerManager.getPlayerById(message.TargetPlayerId);
            broadcastingPlayer = playerManager.getPlayerById(message.PlayerId);

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