/** 
 * @class
 * @description The username window that follows each player. 
*/

function Window_Username(){
    this.initialize(...arguments);
}

Object.setPrototypeOf(Window_Username.prototype, Window_Base.prototype);
Window_Username.prototype.constructor = Window_Username;

/**
 * @private @method
 * @arg {Game_OnlinePlayer} player The online player to which the username window is attached
*/
Window_Username.prototype.initialize = function(player){
    Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, 200, 60));
    /**
     * @private @field
     * @type {Game_OnlinePlayer}
     */
    this._player = player;

    /**
     * @private @field
     * @type {string}
     */
    this._username = this._player.username ?? "player";

    this.setBackgroundType(2);
    this.drawUsername();
}

/**
 * @private @method
 */
Window_Username.prototype.update = function(){
    this.updateMovement();
}

/**
 * @private @method
 */
Window_Username.prototype.updateMovement = function(){
    this.width = this.textWidth(this._username) + 25;
    this.x = this._player.mapEvent.screenX() - this.width / 2;
    this.y = this._player.mapEvent.screenY() - 10;
}

/**
 * @private @method
 */
Window_Username.prototype.drawUsername = function(){
    this.drawTextEx(this._username, 0, 0);
}

