/** 
 * @enum {number}
 * @description The types of messages that can be received by the client from the server
*/
const MessageType = {
    Broadcast: 0,
    Individual: 1,
    Server: 2
}

/** 
 * @enum {string}
 * @description Potential individual message event codes that could be received by the client from the server
*/
const IndividualMessageEventCode = {
    RoomNoExist: "roomNoExist",
    RoomInformation: "roomInformation",
    PlayerInformation: "playerInformation"
}

/** 
 * @enum {string}
 * @description Potential broadcast message event codes that could be received by the client from the server
*/
const BroadcastMessageEventCode = {
    PlayerLeftRoom: "playerLeftRoom",
    PlayerJoinedRoom: "playerJoinedRoom",
    PlayerIsMoving: "playerIsMoving",
    ChatMessage: "chatMessage",
    PlayerIsTyping: "playerIsTyping",
    RoleInformation: "roleInformation",
    MapTransfer: "mapTransfer",
    ActivateNpcs: "activateNpcs",
    NpcStateChange: "npcStateChange",
    TogglePlayerDisguise: "togglePlayerDisguise"
}

/** 
 * @enum {number}
 * @description Codes for closing WebSocket connections
*/
const CloseCode = {
    PlayerLeft: 1000,
    Unknown: 1005,
    ServerError: 1011,
    ServerRestart: 1012,
    Kicked: 4000
}

const Role = {
    Vampire: 0,
    Hunter: 1
}