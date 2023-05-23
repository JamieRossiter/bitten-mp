function Game_ChatInput(){
    this.initialize(...arguments);
}

Game_ChatInput.prototype.initialize = function(){
    this.listenForKeyboardInput();
    this._currentInput = "";
    this._isInputting = false;
}

Game_ChatInput.prototype.listenForKeyboardInput = function(){
    window.addEventListener("keydown", keyEvent => {
        const key = keyEvent.key;
        
        if(this.isKeySpace(key)) this._currentInput += " ";
        else if(this.isKeyBackspace(key)) this._currentInput = this._currentInput.slice(0, -1);
        else if(this.isKeyEnter(key)) this._currentInput = "";
        else if(this.isKeyValid(key)) this._currentInput += keyEvent.key;
        else return;

        this._isInputting = true;
    })

    window.addEventListener("keyup", keyEvent => {
        this._isInputting = false;
    })
}

Game_ChatInput.prototype.isKeyValid = function(key){
    const validKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?.,"@#$%^&*()_+-=:\'\\<>/\\~`{}|[]';
    return validKeys.split("").includes(key);
}

Game_ChatInput.prototype.isKeyBackspace = function(key){
    return key === "Backspace";
}

Game_ChatInput.prototype.isKeySpace = function(key){
    return key === " ";
}

Game_ChatInput.prototype.isKeyEnter = function(key){
    return key === "Enter";
}

Object.defineProperties(Game_ChatInput.prototype, {
    currentInput: {
        get(){
            return this._currentInput;
        }
    },
    isInputting: {
        get(){
            return this._isInputting;
        }
    }
})

$gameChat.input = new Game_ChatInput();