/** 
 * @class
 * @static
 * @description Processes various messages from the server
*/

function Util_MessageProcessor(){}

Util_MessageProcessor.individual = {};
Util_MessageProcessor.broadcast = {};

//====================================================
// INDIVIDUAL MESSAGES
//====================================================

Util_MessageProcessor.individual.roomNoExist = function(message){
    $gameServer.disconnect(CloseCode.Kicked);
    window.alert(`Room code ${message.RoomCode.toUpperCase()} doesn't exist!`);
}

Util_MessageProcessor.individual.playerInformation = function(message){
    
    if(!("PlayerId" in message || "PlayerUsername" in message)){
        // Handle error
        return;
    }
    $gameServer.joinGame($gamePlayer, new Game_OnlinePlayer(message.PlayerId, message.PlayerUsername));
}

Util_MessageProcessor.individual.roomInformation = function(message){
    
    if(!("RoomCode" in message || "RoomPlayers" in message)){
        // Handle error
        return;
    }

    // Set room code
    $gameRoom.setCode(message.RoomCode); 

    // Set room players
    message.RoomPlayers.forEach(player => {

        if(!("Id" in player || "Username" in player)){
            // Handle error
            return;
        }
        const newOnlinePlayer = new Game_OnlinePlayer(player.Id, player.Username);
        const newPlayerEvent = $gameMap.events().find(event => event.isPlayer && !event.onlinePlayer);
        $gameServer.joinGame(newPlayerEvent, newOnlinePlayer);
    })
}

//====================================================
// BROADCAST MESSAGES
//====================================================

Util_MessageProcessor.broadcast.playerJoinedRoom = function(message){
    if(!("PlayerId" in message || "PlayerUsername" in message || "RoomCode" in message)){
        // Handle error
        return;
    }
    if(message.RoomCode !== $gameRoom.code()){
        // Handle error
        return;
    }
    const newOnlinePlayer = new Game_OnlinePlayer(message.PlayerId, message.PlayerUsername);
    const newPlayerEvent = $gameMap.events().find(event => event.isPlayer && !event.onlinePlayer);
    if(!newPlayerEvent){
        // Handle error
        return;
    }
    $gameServer.joinGame(newPlayerEvent, newOnlinePlayer);
    console.info(`${message.PlayerUsername}(${message.PlayerId}) has joined ${message.RoomCode}`);
}

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
    if(message.RoomCode !== $gameRoom.code()){
        // Handle error
    }
    $gameRoom.removePlayerById(message.PlayerId);
    console.info(`${message.PlayerUsername}(${message.PlayerId}) has left ${message.RoomCode} due to ${message.DisconnectMessage}(${message.DisconnectCode})`);
}