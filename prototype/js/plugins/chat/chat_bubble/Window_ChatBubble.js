function Window_ChatBubble(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_ChatBubble.prototype, Window_Base.prototype);
Window_ChatBubble.prototype.constructor = Window_ChatBubble;

Window_ChatBubble.prototype.initialize = function(player){
    Window_Base.prototype.initialize.call(this, new Rectangle(player.mapEvent.screenX(), player.mapEvent.screenY(), Graphics.boxWidth, 100));
    this.initMembers(player);

    this.contents.fontSize = this._fontSize;

    this.opacity = 0;
    this.contentsOpacity = 0;
}

Window_ChatBubble.prototype.initMembers = function(player){
    this._maxWidth = 200;
    this._paddingWidth = 20;
    this._fontSize = 16;
    
    this._openFrames = 0;
    this._targetOpenFrames = 300;
    this._fadeSpeed = 35;

    this._isActive = false;

    this._player = player;
}

Window_ChatBubble.prototype.update = function(){
    if(!this._isActive) return;
    this.updatePosition();
    this.updateOpen();
}

Window_ChatBubble.prototype.updateOpen = function(){
    
    this._openFrames++;

    // If open for long enough, start fade out
    if(this._openFrames > this._targetOpenFrames){

        this.opacity -= this._fadeSpeed;
        this.contentsOpacity -= this._fadeSpeed;

        // Once faded out
        if(this.opacity <= 0){
            this._openFrames = 0;
            this.deactivate();
        }

    } else {

        // If not open yet, start fade in
        this.opacity += this._fadeSpeed;
        this.contentsOpacity += this._fadeSpeed;

        if(this.opacity > 255 && this.contentsOpacity > 255){
            this.opacity = 255;
            this.contentsOpacity = 255;
        }

    }
}

Window_ChatBubble.prototype.updatePosition = function(){
    this.x = this._player.mapEvent.screenX() - this.width / 2;
    this.y = this._player.mapEvent.screenY() - (100 + this.height);
}

Window_ChatBubble.prototype.activate = function(){
    this._isActive = true;
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._openFrames = 0;
}

Window_ChatBubble.prototype.deactivate = function(){
    this._isActive = false;
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._openFrames = 0;
}

Window_ChatBubble.prototype.drawChatMessage = function(text){
    this.contents.clear();

    this.width = this.textWidth(text) + (this._paddingWidth + 5);
    this.height = 45;

    const word = text.split(" ");
    let x2 = 0;
    let y2 = -10;
    let lines = 1;

    word.forEach(word => {
        const width = this.textWidth(word + " "); // Get word width

        // If the width of the previous words + the incoming words is as wide as or wider than the max width
        if ((x2 + width) + this._paddingWidth >= this._maxWidth) {
            this.width = x2 + this._paddingWidth; // Make width of window as wide as the last word that fits on the line
            y2 += this.lineHeight() - this._fontSize;
            x2 = 0;
            lines++;
            switch(lines){
                case 2:
                    this.height = 63;
                    break;
                case 3:
                    this.height = 85;
                    break;
                default:
                    this.height = 300;
            }
        }
        this.drawText(word + " ", x2, y2);
        x2 += width;
    })
}