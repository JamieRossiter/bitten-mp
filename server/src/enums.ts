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
    RoleInformation = "roleInformation",
    MapTransfer = "mapTransfer",
    ActivateNpcs = "activateNpcs",
    NpcStateChange = "npcStateChange",
    TogglePlayerDisguise = "togglePlayerDisguise",
    PlayerDeath = "playerDeath"
}

export enum MessageType {
    Broadcast,
    Individual,
    Server
}