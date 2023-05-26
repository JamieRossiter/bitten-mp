function Window_ChatInput(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_ChatInput.prototype, Window_Base.prototype);
Window_ChatInput.prototype.constructor = Window_ChatInput;

Window_ChatInput.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, Graphics.boxWidth - (Graphics.boxWidth / 6), 60));
    this.y = Graphics.boxHeight - this.height;
    this._cursor = null;
    this._cursorFrames = 0;
    this._cursorDuration = 30;

    this._currentInput = $gameChat.currentInput;
    this._currentInputWidth = 0;
    this.drawCursor();
}

Window_ChatInput.prototype.drawCursor = function(){
    const bitmap = new Bitmap(1.5, 25);
    bitmap.fillAll("white");
    const sprite = new Sprite(bitmap);
    sprite.x = 20;
    sprite.y = (this.height / 2) - (sprite.height / 2);
    this._cursor = sprite;
    this.addChild(sprite);
}

Window_ChatInput.prototype.drawInput = function(){
    if($gameChat.currentInput.length > 0){
        this.changeTextColor("white");
        this._currentInput = $gameChat.currentInput;
    } else {
        this.changeTextColor("grey");
        this._currentInput = "Write a message";
    }
    this._currentInputWidth = this.textWidth(this._currentInput);
    this.drawText(this._currentInput, 6, 0, this._currentInputWidth + 25, "left");
}

Window_ChatInput.prototype.updateCursorPosition = function(){
    if($gameChat.currentInput){
        this._cursor.x = this._currentInputWidth + 23;
    } else {
        this._cursor.x = 20;
    }
}

Window_ChatInput.prototype.updateCursorBlink = function(){
    this._cursorFrames++;
    if(this._cursorFrames === this._cursorDuration){
        this._cursor.hide();
    } else if(this._cursorFrames === this._cursorDuration * 2){
        this._cursor.show();
        this._cursorFrames = 0;
    }
}

Window_ChatInput.prototype.update = function(){
    this.contents.clear();
    this.drawInput();
    this.updateCursorPosition();

    if(!$gameChat.isInputting) this.updateCursorBlink();
    else this._cursor.show();
}