/** 
 * @memberof MessageProcessor
 * @description Contains all methods for processing connection-related messages from the server
*/

//====================================================
// INDIVIDUAL MESSAGES
//====================================================

/**
 * @static
 * @arg { {RoomCode: string} } message 
 */
Util_MessageProcessor.individual.roomNoExist = function(message){
    
    if(!("RoomCode" in message)){
        // Handle error
        return;
    }
    $gameLobby.handleRoomNoExist(message.RoomCode.toUpperCase());
}

/**
 * @static
 * @arg { {PlayerId: string, PlayerUsername: string} } message 
 */
Util_MessageProcessor.individual.playerInformation = function(message){
    
    if(!("PlayerId" in message || "PlayerUsername" in message || "IsHost" in message)){
        // Handle error
        return;
    }
    const currentPlayer = new Game_OnlinePlayer(message.PlayerId, message.PlayerUsername, message.IsHost);
    $gameRoom.setCurrentPlayer(currentPlayer);
    $gamePlayer.setPosition(8, 6);
    $gameRoom.joinGame($gamePlayer, currentPlayer);
}

/**
 * @static
 * @arg { {RoomCode: string, RoomPlayers: Array<{Id: string, Username: string, Position: string, IsHost: boolean}> } } message 
 */
Util_MessageProcessor.individual.roomInformation = function(message){
    
    if(!("RoomCode" in message || "RoomPlayers" in message)){
        // Handle error
        return;
    }

    // Set room code
    $gameRoom.setCode(message.RoomCode); 

    // Set room players
    message.RoomPlayers.forEach(player => {

        if(!("Id" in player || "Username" in player || "Position" in player || "IsHost" in player)){
            // Handle error
            return;
        }
        const newOnlinePlayer = new Game_OnlinePlayer(player.Id, player.Username, player.IsHost);
        const newPlayerEvent = $gameMap.events().find(event => {
            return event.isPlayer() && !event.isPlaying
        });
        $gameRoom.joinGame(newPlayerEvent, newOnlinePlayer);
        newPlayerEvent.setPosition(player.Position.x, player.Position.y);
        newPlayerEvent.setDirection(player.Position.dir);
    })
}

//====================================================
// BROADCAST MESSAGES
//====================================================

/**
 * @static
 * @arg { {PlayerId: string, PlayerUsername: string} } message 
 */
Util_MessageProcessor.broadcast.playerJoinedRoom = function(message){
    if(!("PlayerId" in message || "PlayerUsername" in message || "RoomCode" in message)){
        // Handle error
        return;
    }
    if(message.RoomCode !== $gameRoom.code){
        // Handle error
        return;
    }
    const newOnlinePlayer = new Game_OnlinePlayer(message.PlayerId, message.PlayerUsername);
    const newPlayerEvent = $gameMap.events().find(event => {
        return event.isPlayer() && !event.isPlaying;
    });
    if(!newPlayerEvent){
        // Handle error
        return;
    }
    newPlayerEvent.setPosition(8, 6);
    $gameRoom.joinGame(newPlayerEvent, newOnlinePlayer);
    console.info(`${message.PlayerUsername}(${message.PlayerId}) has joined ${message.RoomCode}`);
}

/**
 * @static
 * @arg { {PlayerId: string, PlayerUsername: string, DisconnectCode: number, DisconnectMessage: string, RoomCode: string} } message 
 */
Util_MessageProcessor.broadcast.playerLeftRoom = function(message){
    if(
        !("PlayerId" in message 
        || "PlayerUsername" in message 
        || "DisconnectCode" in message 
        || "DisconnectMessage" in message
        || "RoomCode" in message
    )){
        // Handle error
    }
    if(message.RoomCode !== $gameRoom.code){
        // Handle error
    }
    $gameRoom.leaveGame($gameRoom.findPlayerById(message.PlayerId));
    console.info(`${message.PlayerUsername}(${message.PlayerId}) has left ${message.RoomCode} due to ${message.DisconnectMessage}(${message.DisconnectCode})`);
}