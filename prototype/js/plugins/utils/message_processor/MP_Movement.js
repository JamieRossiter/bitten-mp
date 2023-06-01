/**
 * @memberof MessageProcessor
 */

//====================================================
// BROADCAST MESSAGES
//====================================================

Util_MessageProcessor.broadcast.playerIsMoving = function(message){

    const targetPlayer = $gameRoom.findPlayerById(message.PlayerId);
    targetPlayer.mapEvent.queuedDirection = message.Dir;
    targetPlayer.mapEvent.isCurrentlyMoving = Boolean(message.IsMoving);
    // If the player has stopped moving, set their queued position to match the server
    if(!Boolean(message.IsMoving)) targetPlayer.mapEvent.setQueuedPosition(message.X, message.Y);
}