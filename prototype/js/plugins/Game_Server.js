import { MessageType, IndividualMessageEventCode, BroadcastMessageEventCode } from "./enums";
import { ServerMessage } from "./types";

function Game_Server(){
    this.initialize();
}

Game_Server.prototype.initialize = function(){
    this._socket = null;
    this._isConnected = false;
}

Game_Server.prototype.connect = function(){
    this._socket = new WebSocket("ws://localhost:5000?username=jimjams&isHost=false&roomCode=testRoom");
    this.listen();
}

Game_Server.prototype.listen = function(){

    if(!this._socket) return;

    this._socket.addEventListener("message", messageEvent => {
        
        const parsedMessage = JSON.parse(messageEvent.data);
        const serverMessage = { type: parsedMessage.Type, event: parsedMessage.Event, message: JSON.parse(parsedMessage.message)};
        
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
            window.alert("The room you are trying to join does not exist!");
            break;
        case IndividualMessageEventCode.PlayerInformation:
            // Handle player information
            break;
        case IndividualMessageEventCode.RoomInformation:
            // Handle room information
            break;
    }

}

Game_Server.prototype.processBroadcastMessage = function(event, message){

    switch(event)
    {
        case BroadcastMessageEventCode.PlayerJoinedRoom:
            // Handle player joined room
            break;
        case BroadcastMessageEventCode.PlayerLeftRoom:
            // Handle player left room
            break;
    }

}

const $gameServer = new Game_Server();