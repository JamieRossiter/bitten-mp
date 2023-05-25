/**
 * @memberof MessageProcessor
 */

//====================================================
// BROADCAST MESSAGES
//====================================================

/**
 * @static
 * @arg {{ X: number, Y: number, Dir: number }} message 
 */
Util_MessageProcessor.broadcast.playerMoveStraight = function(message){

    const targetPlayerId = message.PlayerId;
    const targetPlayer = $gameRoom.findPlayerById(targetPlayerId);
    const coords = {x: message.X, y: message.Y, dir: message.Dir};

    if(!targetPlayer){
        // Handle error
        return;
    }

    // Move player
    targetPlayer.mapEvent.moveStraight(coords.dir);
}