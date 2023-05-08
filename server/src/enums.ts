/** 
 * @file enums.ts
 * @description Enums
*/

export enum MessageEventCode {
    RoomNoExist = "roomNoExist",
    PlayerLeftRoom = "playerLeftRoom",
    PlayerJoinedRoom = "playerJoinedRoom",
    RoomInformation = "roomInformation",
    PlayerInformation = "playerInformation"
}

export enum MessageType {
    Broadcast,
    Individual
}