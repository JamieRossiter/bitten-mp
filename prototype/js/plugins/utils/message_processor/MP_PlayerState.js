/** 
 * @memberof MessageProcessor
*/

/**
 * @param {{PlayerId: string, Role: number}} message 
 */
Util_MessageProcessor.broadcast.roleInformation = function(message){
    const targetPlayer = $gameRoom.findPlayerById(message.PlayerId);
    if(message.Disguise){
        targetPlayer.setDisguise(message.Disguise.isDisguised, message.Disguise.gender, message.Disguise.npc)
    }
    targetPlayer.setRole(message.Role);
}

Util_MessageProcessor.broadcast.togglePlayerDisguise = function(message){
    const targetPlayer = $gameRoom.findPlayerById(message.PlayerId);
    targetPlayer.setDisguise(message.IsDisguised, targetPlayer.npcDisguise.gender, targetPlayer.npcDisguise.npc);
}