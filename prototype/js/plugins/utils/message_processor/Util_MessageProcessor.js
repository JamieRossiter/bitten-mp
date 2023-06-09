/**
 * @namespace MessageProcessor
*/

/** 
 * @class
 * @static
 * @description Processes various messages from the server
*/
function Util_MessageProcessor(){}

/**
 * @static
 * @member {object}
 * @desc Contains all methods for processing server messages tagged as "individual" messages (not to be broadcasted)
 */
Util_MessageProcessor.individual = {};

/**
 * @static 
 * @member {object}
 * @desc Contains all methods for processing server messages tagged as "broadcast" messages
 */
Util_MessageProcessor.broadcast = {};

/**
 * @static
 * @arg {object} message 
 * @desc Processes a message received from the server
 */
Util_MessageProcessor.processMessage = function(message){
    switch(message.type)
    {
        case MessageType.Individual:
            Util_MessageProcessor.processIndividualMessage(message.event, message.message);
            break;
        case MessageType.Broadcast:
            Util_MessageProcessor.processBroadcastMessage(message.event, message.message);
            break;
    }
}

/**
 * @static 
 * @arg {string} event 
 * @arg {object} message 
 * @desc Processes a message received from the server marked as an "individual" message (not to be broadcasted)
 */
Util_MessageProcessor.processIndividualMessage = function(event, message){

    switch(event)
    {
        case IndividualMessageEventCode.RoomNoExist:
            Util_MessageProcessor.individual.roomNoExist(message);
            break;
        case IndividualMessageEventCode.PlayerInformation:
            Util_MessageProcessor.individual.playerInformation(message);
            break;
        case IndividualMessageEventCode.RoomInformation:
            Util_MessageProcessor.individual.roomInformation(message);
            break;
    }

}

/**
 * @static
 * @arg {string} event 
 * @arg {object} message 
 * @desc Processes a message received from the server marked as a "broadcast" message
 */
Util_MessageProcessor.processBroadcastMessage = function(event, message){

    switch(event)
    {
        case BroadcastMessageEventCode.PlayerJoinedRoom:
            Util_MessageProcessor.broadcast.playerJoinedRoom(message);
            break;
        case BroadcastMessageEventCode.PlayerLeftRoom:
            Util_MessageProcessor.broadcast.playerLeftRoom(message);
            break;
        case BroadcastMessageEventCode.PlayerIsMoving:
            Util_MessageProcessor.broadcast.playerIsMoving(message);
            break;
        case BroadcastMessageEventCode.ChatMessage:
            Util_MessageProcessor.broadcast.chatMessage(message);
            break;
        case BroadcastMessageEventCode.PlayerIsTyping:
            Util_MessageProcessor.broadcast.playerIsTyping(message);
            break;
        case BroadcastMessageEventCode.RoleInformation:
            Util_MessageProcessor.broadcast.roleInformation(message);
            break;
        case BroadcastMessageEventCode.MapTransfer:
            Util_MessageProcessor.broadcast.mapTransfer(message);
            break;
        case BroadcastMessageEventCode.ActivateNpcs:
            Util_MessageProcessor.broadcast.activateNpcs(message);
            break;
        case BroadcastMessageEventCode.NpcStateChange:
            Util_MessageProcessor.broadcast.npcStateChange(message);
            break;
        case BroadcastMessageEventCode.TogglePlayerDisguise:
            Util_MessageProcessor.broadcast.togglePlayerDisguise(message);
            break;
        case BroadcastMessageEventCode.PlayerDeath:
            Util_MessageProcessor.broadcast.playerDeath(message);
            break;
    }

}