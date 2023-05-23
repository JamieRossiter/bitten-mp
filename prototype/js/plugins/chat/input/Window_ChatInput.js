function Window_ChatInput(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_ChatInput.prototype, Window_Base.prototype);

Window_ChatInput.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, Graphics.boxWidth, 60));
    this.y = Graphics.boxHeight - this.height;
    this._cursor = null;
    this._cursorFrames = 0;
    this._cursorDuration = 30;
    this._currentInput = $gameChat.input.currentInput;
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
    this._currentInput = $gameChat.inp
    ut.currentInput;
    this._currentInputWidth = this.textWidth(this._currentInput);
    this.drawTextEx(this._currentInput, 8, 0);
}

Window_ChatInput.prototype.updateCursorPosition = function(){
    if(this._currentInput){
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

    if(!$gameChat.input.isInputting) this.updateCursorBlink();
    else this._cursor.show();
}