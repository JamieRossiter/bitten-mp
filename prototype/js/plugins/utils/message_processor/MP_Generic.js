/** 
 * @memberof MessageProcessor
 * @description Contains all methods for processing generic messages from the server
*/

Util_MessageProcessor.broadcast.mapTransfer = function(message){
    $gamePlayer.reserveTransfer(message.MapId, message.X, message.Y, message.Dir, 0);
}