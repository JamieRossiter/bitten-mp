/**
 * @class
 */
function Window_ChatBubble(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_ChatBubble.prototype, Window_Base.prototype);
Window_ChatBubble.prototype.constructor = Window_ChatBubble;

/**
 * @private
 * @param {Game_Chat} player 
 */
Window_ChatBubble.prototype.initialize = function(player){
    Window_Base.prototype.initialize.call(this, new Rectangle(player.mapEvent.screenX(), player.mapEvent.screenY(), Graphics.boxWidth, 200));
    this.initMembers(player);

    this.contents.fontSize = this._fontSize;

    /**
     * @private
     * @type {number}
     */
    this.opacity = 0;

    /**
     * @private
     * @type {number}
     */
    this.contentsOpacity = 0;
}

/**
 * @param {Game_OnlinePlayer} player 
 */
Window_ChatBubble.prototype.initMembers = function(player){
    this._maxWidth = 200;
    this._paddingWidth = 20;
    this._fontSize = 16;
    
    this._openFrames = 0;
    this._targetOpenFrames = 300;
    this._fadeSpeed = 35;

    this._typingIndicator = ".";
    this._typingIndicatorFrames = 0;

    this._isActive = false;

    /**
     * @private
     * @type {Game_OnlinePlayer}
     */
    this._player = player;
}

/**
 * @private
 */
Window_ChatBubble.prototype.update = function(){
    if(!this._isActive) return;
    this.updatePosition();
    this.updateOpen();
}

/**
 * @private
 */
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

/**
 * @private
 */
Window_ChatBubble.prototype.updatePosition = function(){
    this.x = this._player.mapEvent.screenX() - this.width / 2;
    this.y = this._player.mapEvent.screenY() - (100 + this.height);
}

/**
 * @desc Activates the chat bubble window.
 */
Window_ChatBubble.prototype.activate = function(){
    this._isActive = true;
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._openFrames = 0;
}

/**
 * @desc Deactivates and hides the chat bubble window
 */
Window_ChatBubble.prototype.deactivate = function(){
    this._isActive = false;
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._openFrames = 0;
}

/**
 * @param {string} text 
 */
Window_ChatBubble.prototype.drawChatMessage = function(text){
    this.contents.clear();

    this.width = this.textWidth(text) + (this._paddingWidth + 5);
    this.height = 45;

    const words = text.split(" ");
    let x2 = 0;
    let y2 = -10;
    let lines = 1;
    let largestWidth = 0;
    let longestWord = "";

    words.forEach(word => {
        const width = this.textWidth(word + " "); // Get word width

        // If the width of the previous words + the incoming words is as wide as or wider than the max width
        if ((x2 + width) + this._paddingWidth >= this._maxWidth) {
            
            // Crop the window width to the largest width
            if(largestWidth < (x2 + this._paddingWidth)){
                largestWidth = x2 + (this._paddingWidth);
                this.width = largestWidth;
            }

            // Check that width of longest word is not longer than current window width
            if(longestWord.length < word.length && (this.textWidth(word) + this._paddingWidth) > this.width){
                longestWord = word;
                this.width = this.textWidth(longestWord) + (this._paddingWidth + 5);
            }
            
            x2 = 0;

            // Handle long one word messages
            if(!(words.length === 1)){
                y2 += this.lineHeight() - this._fontSize;
                lines++;
            }
            
            switch(lines){
                case 2:
                    this.height = 63;
                    break;
                case 3:
                    this.height = 85;
                    break;
                case 4:
                    this.height = 102;
                    break;
                case 5:
                    this.height = 120;
                    break;
                case 6: 
                    this.height = 143;
                    break;
            }
        }

        this.drawText(word + " ", x2, y2);
        x2 += width;
    })
}

Object.defineProperties(Window_ChatBubble.prototype, {
    /**
     * @instance
     * @memberof Window_ChatBubble
     * @type {boolean}
     */
    isActive: {
        get(){
            return this._isActive;
        }
    }
})