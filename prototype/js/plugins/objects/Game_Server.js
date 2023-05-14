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

Game_Server.prototype.connect = function(username){
    if(!username){
        // Handle error
        console.error("Username not provided for connection.");
        return;
    }
    this._socket = new WebSocket(`ws://localhost:5000?username=${username}&isHost=false&roomCode=testRoom`);
    this.listen();
}

Game_Server.prototype.disconnect = function(){
    if(!this._socket){
        // Handle error
    }
    this._socket.close();
}

Game_Server.prototype.listen = function(){

    this._socket.addEventListener("error", errorEvent => {
        // Handle connection error here!
        console.error(errorEvent);
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

const $gameServer = new Game_Server();