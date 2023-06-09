/**
 * @class
 */
function Window_ChatInput(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_ChatInput.prototype, Window_Base.prototype);
Window_ChatInput.prototype.constructor = Window_ChatInput;

/**
 * @private
 */
Window_ChatInput.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, Graphics.boxWidth - (Graphics.boxWidth / 2), 60));
    this.x = (Graphics.boxWidth / 2) - (this.width / 2);
    this.y = Graphics.boxHeight - this.height;
    
    /**
     * @private
     * @type {Sprite}
     * @desc The cursor sprite for the input window 
    */
    this._cursor = null;

    /**
     * @private
     * @type {number}
     * @desc Frames for keeping track of cursor blink
     */
    this._cursorFrames = 0;

    /**
     * @private
     * @type {number}
     * @desc The amount of time the cursors stays blinked or unblinked
     */
    this._cursorDuration = 30;

    /**
     * @private
     * @type {string}
     */
    this._currentInput = $gameChat.currentInput;

    /**
     * @private
     * @type {number}
     */
    this._currentInputWidth = 0;

    this.drawCursor();
}

/**
 * @desc Draw the cursor sprite
 */
Window_ChatInput.prototype.drawCursor = function(){
    const bitmap = new Bitmap(1.5, 25);
    bitmap.fillAll("white");
    const sprite = new Sprite(bitmap);
    sprite.x = 20;
    sprite.y = (this.height / 2) - (sprite.height / 2);
    this._cursor = sprite;
    this.addChild(sprite);
}

/**
 * @desc Draw the input text
 */
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

/**
 * @private
 */
Window_ChatInput.prototype.updateCursorPosition = function(){
    if($gameChat.currentInput){
        this._cursor.x = this._currentInputWidth + 23;
    } else {
        this._cursor.x = 20;
    }
}

/**
 * @private
 */
Window_ChatInput.prototype.updateCursorBlink = function(){
    this._cursorFrames++;
    if(this._cursorFrames === this._cursorDuration){
        this._cursor.hide();
    } else if(this._cursorFrames === this._cursorDuration * 2){
        this._cursor.show();
        this._cursorFrames = 0;
    }
}

/**
 * @private
 */
Window_ChatInput.prototype.update = function(){
    this.contents.clear();
    this.drawInput();
    this.updateCursorPosition();

    if(!$gameChat.isInputting) this.updateCursorBlink();
    else this._cursor.show();
}