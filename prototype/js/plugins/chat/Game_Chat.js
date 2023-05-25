function Game_Chat(){
    this.initialize(...arguments);
}

Game_Chat.prototype.initialize = function(){
    this._isActive = false;
    this._currentInput = "";
    this._isInputting = false;
    this._chatInputWindow = null;

    this._keyInputListener = this.keyboardInputListener.bind(this);
    this._keyReleaseListener = this.keyboardReleaseListener.bind(this);
}

Game_Chat.prototype.keyboardInputListener = function(keyEvent){
    const key = keyEvent.key;
    
    if(this.isKeySpace(key)) this._currentInput += " ";
    else if(this.isKeyBackspace(key)) this._currentInput = this._currentInput.slice(0, -1);
    else if(this.isKeyEnter(key)){
        this.activatePlayerChatBubble($gameRoom.currentPlayer, this._currentInput);
        $gameRoom.broadcastChatMessage(this._currentInput);
        this._currentInput = "";
    }
    else if(this.isKeyValid(key)) this._currentInput += keyEvent.key;
    else return;

    this._isInputting = true;
}

Game_Chat.prototype.keyboardReleaseListener = function(_){
    this._isInputting = false;
}

Game_Chat.prototype.isKeyValid = function(key){
    const validKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?.,"@#$%^&*()_+-=:\'\\<>/\\~`{}|[]';
    return validKeys.split("").includes(key);
}

Game_Chat.prototype.isKeyBackspace = function(key){
    return key === "Backspace";
}

Game_Chat.prototype.isKeySpace = function(key){
    return key === " ";
}

Game_Chat.prototype.isKeyEnter = function(key){
    return key === "Enter";
}

Game_Chat.prototype.activate = function(){
    this._isActive = true;
    this._chatInputWindow = new Window_ChatInput();
    SceneManager._scene.addChild(this._chatInputWindow);
    window.addEventListener("keydown", this._keyInputListener);
    window.addEventListener("keyup", this._keyReleaseListener); 
}

Game_Chat.prototype.deactivate = function(){
    this._isActive = false;
    this._currentInput = "";
    this._isInputting = false;
    SceneManager._scene.removeChild(this._chatInputWindow);
    window.removeEventListener("keydown", this._keyInputListener);
    window.removeEventListener("keyup", this._keyReleaseListener);
}

Game_Chat.prototype.activatePlayerChatBubble = function(player, message){
    player.chatBubbleWindow.drawChatMessage(message);
    player.chatBubbleWindow.activate();
}

Object.defineProperties(Game_Chat.prototype, {
    currentInput: {
        get(){
            return this._currentInput;
        }
    },
    isInputting: {
        get(){
            return this._isInputting;
        }
    },
    isActive: {
        get(){
            return this._isActive;
        }
    }
})

const $gameChat = new Game_Chat();

const gameChat_sceneMap_update_alias = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
    gameChat_sceneMap_update_alias.call(this);

    if(!$gameServer.isConnected) return;

    if(Input.isTriggered("chat") && !$gameChat.isActive){
        $gameChat.activate();
    } else if (Input.isTriggered("escape") && $gameChat.isActive){
        $gameChat.deactivate();
    }
}