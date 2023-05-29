/** 
 * @memberof MessageProcessor
 * @description Contains all methods for processing chat-related messages from the server
*/

/**
 * @param {{PlayerId: string, ChatMessage: string}} message 
 */
Util_MessageProcessor.broadcast.chatMessage = function(message){
    const targetPlayer = $gameRoom.findPlayerById(message.PlayerId);
    const chatMessage = message.ChatMessage;
    $gameRoom.addMessageToLog(targetPlayer, chatMessage);
    $gameChat.activatePlayerChatBubble(targetPlayer, chatMessage);
}

/**
 * @param {{PlayerId: string, IsTyping: string}} message 
 */
Util_MessageProcessor.broadcast.playerIsTyping = function(message){
    const targetPlayer = $gameRoom.findPlayerById(message.PlayerId);
    const isTyping = Boolean(message.IsTyping);
    
    if(isTyping){
        $gameChat.activatePlayerTypingIndicator(targetPlayer)
    } else {
        $gameChat.deactivatePlayerTypingIndicator(targetPlayer)
    }
    
}