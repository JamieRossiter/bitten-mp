/** 
 * @class
 * @description Client-side representation of the server
*/
function Game_Server(){
    this.initialize();
}

Game_Server.prototype.initialize = function(){
    this._socket = null;
    this._isConnected = false;
}

Game_Server.prototype.connect = function(username, isHost, roomCode){
    if(!username){
        // Handle error
        console.error("Username not provided for connection.");
        return;
    }
    const hostStatus = Boolean(isHost);
    this._socket = new WebSocket(`ws://localhost:5000?username=${username}&isHost=${hostStatus}${roomCode ? "&roomCode=" + roomCode : ""}`);
    this.listen();
    this._isConnected = true;
}

Game_Server.prototype.disconnect = function(code){
    if(!this._socket){
        // Handle error
    }
    this._socket.close(code);
}

Game_Server.prototype.listen = function(){

    this._socket.addEventListener("open", connectEvent => {
    })

    this._socket.addEventListener("close", closeEvent => {
        console.error(closeEvent);
        this._isConnected = false;
    })

    this._socket.addEventListener("error", errorEvent => {
        // Handle connection error here!
        console.error(errorEvent);
        this._isConnected = false;
    })

    this._socket.addEventListener("message", messageEvent => {
        
        const parsedMessage = JSON.parse(messageEvent.data);
        const serverMessage = { type: parsedMessage.Type, event: parsedMessage.Event, message: JSON.parse(parsedMessage.Message)};

        switch(serverMessage.type)
        {
            case MessageType.Individual:
                this.processIndividualMessage(serverMessage.event, serverMessage.message);
                break;
            case MessageType.Broadcast:
                this.processBroadcastMessage(serverMessage.event, serverMessage.message);
                break;
        }

    })
}

Game_Server.prototype.processIndividualMessage = function(event, message){

    switch(event)
    {
        case IndividualMessageEventCode.RoomNoExist:
            Util_MessageProcessor.individual.roomNoExist(message);
            break;
        case IndividualMessageEventCode.PlayerInformation:
            Util_MessageProcessor.individual.playerInformation(message);
            break;
        case IndividualMessageEventCode.RoomInformation:
            Util_MessageProcessor.individual.roomInformation(message);
            break;
    }

}

Game_Server.prototype.processBroadcastMessage = function(event, message){

    switch(event)
    {
        case BroadcastMessageEventCode.PlayerJoinedRoom:
            Util_MessageProcessor.broadcast.playerJoinedRoom(message);
            break;
        case BroadcastMessageEventCode.PlayerLeftRoom:
            Util_MessageProcessor.broadcast.playerLeftRoom(message);
            break;
    }

}

Game_Server.prototype.joinGame = function(parent, onlinePlayer){
    parent.setTransparent(false);
    parent.setPattern(2);
    $gameRoom.addPlayer(onlinePlayer);
    parent.setOnlinePlayer(onlinePlayer);
    parent.setPosition(8, 6);
    parent.createUsernameWindow();
}

Game_Server.prototype.leaveGame = function(parent){
    parent.setTransparent(true);
    parent.setOnlinePlayer(null);
    parent.setPosition(-100, -100);
    parent.destroyUsernameWindow();
}

Game_Server.prototype.isConnected = function(){
    return this._isConnected;
}

const $gameServer = new Game_Server();