function Window_ChatLog(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_ChatLog.prototype, Window_Base.prototype);
Window_ChatLog.prototype.constructor = Window_ChatLog;

Window_ChatLog.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight));
    if(!$gameChat.chatInputWindow) return;

    this.x = $gameChat.chatInputWindow.x;
    this.height = Graphics.boxHeight - $gameChat.chatInputWindow.height;
    this.width = $gameChat.chatInputWindow.width;

    this._previousLines = 1;
}

Window_ChatLog.prototype.update = function(){
    this.contents.clear();
    this.drawChatMessageLog();
}

Window_ChatLog.prototype.drawChatMessageLog = function(){

    if(!$gameRoom.chatMessageLog) return;
    
    $gameRoom.chatMessageLog.toReversed().forEach(({player, message}, index) => {

        let x = 10;
        let y = this.height - ($gameChat.chatInputWindow.height + (30 * (index + 1)));

        if(!player){
            this.drawTextEx(message, x, y - 5);
            return;
        }

        this.drawTextEx(`\\c[2]${player.username}\\c[0]: ${message}`, x, y);
    })
}
