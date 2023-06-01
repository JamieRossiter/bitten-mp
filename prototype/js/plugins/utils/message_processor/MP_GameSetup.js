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

Util_MessageProcessor.broadcast.activateNpcs = function(message){
    console.log(message);
    message.NpcData.forEach(npc => {
        $gameMap.event(npc.id).setPath(npc.path);
        $gameMap.event(npc.id).setPosition(npc.x, npc.y, 0);
    })
}