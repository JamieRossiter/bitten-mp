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
    // Handle room no exist
}

Util_MessageProcessor.individual.playerInformation = function(message){
    
    if(!("PlayerId" in message || "PlayerUsername" in message)){
        // Handle error
        return;
    }
    $gamePlayer.setOnlineData(new Game_OnlinePlayer(message.PlayerId, message.PlayerUsername));
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
        $gameRoom.addPlayer(new Game_OnlinePlayer(player.Id, player.Username));
    })
}

//====================================================
// BROADCAST MESSAGES
//====================================================

Util_MessageProcessor.broadcast.playerJoinedRoom = function(message){
    if(!("PlayerId" in message || "PlayerUsername" in message || "RoomCode" in message)){
        // Handle error
    }
    if(message.RoomCode !== $gameRoom.code()){
        // Handle error
    }
    $gameRoom.addPlayer(new Game_OnlinePlayer(message.PlayerId, message.PlayerUsername));
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