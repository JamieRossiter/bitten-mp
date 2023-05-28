function Window_TypingIndicator(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_TypingIndicator.prototype, Window_Base.prototype);
Window_TypingIndicator.prototype.constructor = Window_TypingIndicator;

Window_TypingIndicator.prototype.initialize = function(player){
    Window_Base.prototype.initialize.call(this, new Rectangle(player.mapEvent.screenX(), player.mapEvent.screenY(), 58, 200))
    this._player = player;
    this._text = ".";
    this._frames = 0;
    this._targetFrames = 30;
    this._isActive = false;
    this.hide();
}

Window_TypingIndicator.prototype.update = function(){
    if(!this._isActive) return;
    this.updatePosition();
    this.updateTypingIndicator();
}

Window_TypingIndicator.prototype.updatePosition = function(){
    this.x = this._player.mapEvent.screenX() - this.width / 2;
    this.y = this._player.mapEvent.screenY() - (100 + this.height);
}

Window_TypingIndicator.prototype.updateTypingIndicator = function(){
    this.contents.clear();
    this.height = 45;

    this._frames++;

    if((this._frames > this._targetFrames) && (this._frames < (this._targetFrames * 2))){
        this._text = "..";
    } else if (this._frames > (this._targetFrames * 2) && (this._frames < (this._targetFrames * 3))){
        this._text = "...";
    } else if (this._frames > (this._targetFrames * 3)) {
        this._text = ".";
        this._frames = 0;
    }
    this.drawText(this._text, -3, -13);
}

Window_TypingIndicator.prototype.activate = function(){
    this.show();
    this._isActive = true;
}

Window_TypingIndicator.prototype.deactivate = function(){
    this.hide();
    this._isActive = false;
}