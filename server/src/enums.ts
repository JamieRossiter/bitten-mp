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
    PlayerMoveStraight = "playerMoveStraight",
    ChatMessage = "chatMessage",
    PlayerIsTyping = "playerIsTyping"
}

export enum MessageType {
    Broadcast,
    Individual,
    Server
}