/** 
 * @memberof MessageProcessor
*/

Util_MessageProcessor.broadcast.activateNpcs = function(message){
    message.NpcData.forEach(npc => {
        $gameMap.event(npc.Id).setPath(npc.Path);
    })
}

Util_MessageProcessor.broadcast.npcStateChange = function(message){
    const targetNpc = $gameRoom.getNpcById(message.NpcId);
    targetNpc.setPage("state", message.TargetState);
}
