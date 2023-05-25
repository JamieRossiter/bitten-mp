/** 
 * @memberof MessageProcessor
 * @description Contains all methods for processing chat-related messages from the server
*/

Util_MessageProcessor.broadcast.chatMessage = function(message){
    const targetPlayer = $gameRoom.findPlayerById(message.PlayerId);
    const chatMessage = message.ChatMessage;
    $gameChat.activatePlayerChatBubble(targetPlayer, chatMessage);
}