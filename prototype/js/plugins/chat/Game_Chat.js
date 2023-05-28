function Game_Chat(){
    this.initialize(...arguments);
}

Game_Chat.prototype.initialize = function(){
    this.initMembers();
}

Game_Chat.prototype.initMembers = function(){
    this._isActive = false;
    this._currentInput = "";
    this._scrolledInput = "";
    this._isInputting = false;
    this._isTyping = false;

    this._chatInputWindow = null;

    this._maxInputCharacters = 50; 
    this._maxCharacters = 100;

    this._keyInputListener = this.keyboardInputListener.bind(this);
    this._keyReleaseListener = this.keyboardReleaseListener.bind(this);
}

Game_Chat.prototype.keyboardInputListener = function(keyEvent){
    const key = keyEvent.key;
    const totalInput = this._scrolledInput + this._currentInput;
    
    // Handle key press
    if(this.isKeySpace(key) && (totalInput.length <= this._maxCharacters)){

        this._currentInput += " ";

    } else if(this.isKeyBackspace(key)){
        
        // Handle text scroll
        if(this._scrolledInput.length > 0){
            this._currentInput = this._scrolledInput[this._scrolledInput.length - 1] + this._currentInput;
            this._scrolledInput = this._scrolledInput.slice(0, -1);
        }
        // If the player removes all text from input, deactivate typing indicator window
        if(totalInput.length <= 1){
            $gameRoom.broadcastPlayerIsTyping(false);
            this.deactivatePlayerTypingIndicator($gameRoom.currentPlayer);
            this._isTyping = false;
        }
        this._currentInput = this._currentInput.slice(0, -1);

    } else if(this.isKeyEnter(key)){
        
        if(!totalInput.trim()) return; 

        this.activatePlayerChatBubble($gameRoom.currentPlayer, totalInput.trim());
        $gameRoom.broadcastPlayerIsTyping(false);
        this.deactivatePlayerTypingIndicator($gameRoom.currentPlayer);
        this._isTyping = false;

        $gameRoom.broadcastChatMessage(totalInput.trim());
        this._currentInput = "";
        this._scrolledInput = "";

    } else if(this.isKeyValid(key) && ((totalInput.length) <= this._maxCharacters)){
        
        this._currentInput += key;

        // If the player has started typing and their chat bubble window is not active, activate the typing indicator window
        if(!this._isTyping && !$gameRoom.currentPlayer.chatBubbleWindow.isActive){
            $gameChat.activatePlayerTypingIndicator($gameRoom.currentPlayer);
            $gameRoom.broadcastPlayerIsTyping(true);
            this._isTyping = true;
        }      

    } else return;

    // Handle text scroll
    if(this._currentInput.length >= this._maxInputCharacters){
    
        this._scrolledInput += this._currentInput[this._maxInputCharacters - this._currentInput.length];
        this._currentInput = this._currentInput.substring(1);
    
    }

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

Game_Chat.prototype.activatePlayerTypingIndicator = function(player){
    player.typingIndicatorWindow.activate();
}

Game_Chat.prototype.deactivatePlayerTypingIndicator = function(player){
    player.typingIndicatorWindow.deactivate();
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
        $gameRoom.broadcastPlayerIsTyping(false);
        $gameChat._isTyping = false;
        $gameChat.deactivatePlayerTypingIndicator($gameRoom.currentPlayer);
    }
}