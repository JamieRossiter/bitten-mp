/** 
 * @file enums.ts
 * @description Enums
*/

export enum IndividualMessageEventCode {
    RoomNoExist = "roomNoExist",
    RoomInformation = "roomInformation",
    PlayerInformation = "playerInformation"
}

export enum BroadcastMessageEventCode {
    PlayerLeftRoom = "playerLeftRoom",
    PlayerJoinedRoom = "playerJoinedRoom",
    PlayerIsMoving = "playerIsMoving",
    ChatMessage = "chatMessage",
    PlayerIsTyping = "playerIsTyping",
    PlayerAssignedRole = "playerAssignedRole",
    MapTransfer = "mapTransfer",
    ActivateNpcs = "activateNpcs"
}

export enum MessageType {
    Broadcast,
    Individual,
    Server
}