/** 
 * @enum 
 * @description The types of messages that can be received by the client from the server
*/
const MessageType = {
    Broadcast: 0,
    Individual: 1
}

/** 
 * @enum
 * @description Potential individual message event codes that could be received by the client from the server
*/
const IndividualMessageEventCode = {
    RoomNoExist: "roomNoExist",
    RoomInformation: "roomInformation",
    PlayerInformation: "playerInformation"
}

/** 
 * @enum
 * @description Potential broadcast message event codes that could be received by the client from the server
*/
const BroadcastMessageEventCode = {
    PlayerLeftRoom: "playerLeftRoom",
    PlayerJoinedRoom: "playerJoinedRoom",
}