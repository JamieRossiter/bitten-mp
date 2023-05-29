/** 
 * @memberof MessageProcessor
 * @description Contains all methods for processing game setup messages from the server
*/

/**
 * @param {{PlayerId: string, Role: number}} message 
 */
Util_MessageProcessor.broadcast.playerAssignedRole = function(message){
    const targetPlayer = $gameRoom.findPlayerById(message.PlayerId);
    targetPlayer.setRole(message.Role);
}