/** 
 * @class
 * @description The username window that follows each player. 
*/

function Window_Username(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_Username.prototype, Window_Base.prototype);
Window_Username.prototype.constructor = Window_Username;

Window_Username.prototype.initialize = function(player){
    Window_Base.prototype.initialize.call(this, new Rectangle(player.mapEvent.screenX(), player.mapEvent.screenY(), 200, 60));
    this._player = player;
    this._username = this._player.username ?? "player";

    this.setBackgroundType(2);
    this.drawUsername();
}

Window_Username.prototype.update = function(){
    this.updateMovement();
}

Window_Username.prototype.updateMovement = function(){
    this.width = this.textWidth(this._username) + 25;
    this.x = this._player.mapEvent.screenX() - this.width / 2;
    this.y = this._player.mapEvent.screenY() - 10;
}

Window_Username.prototype.drawUsername = function(){
    this.drawTextEx(this._username, 0, 0);
}

