/**
 * @external
 * @memberof Game_Player
 * @param {number} direction
 * @description Broadcasts the player's position during the execute move method 
 */
Game_Player.prototype.moveStraight = function(d) {
    if(!$gameServer.isConnected || $gameServer.connectionError || $gameChat.isActive) return;
    
    this.setMovementSuccess(this.canPass(this._x, this._y, d));
    if (this.isMovementSucceeded()) {
        this.setDirection(d);
        this._x = $gameMap.roundXWithDirection(this._x, d);
        this._y = $gameMap.roundYWithDirection(this._y, d);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
        this.increaseSteps();
        $gameRoom.broadcastPlayerMoveStraight({x: this._x, y: this._y, dir: d});
    } else {
        this.setDirection(d);
        this.checkEventTriggerTouchFront(d);
    }
    
};

/**
 * @external
 * @memberof Game_Player
 * @description Movement by touch input no longer defaults to dashing speed
 */
Game_Player.prototype.updateDashing = function() {
    if (this.isMoving()) {
        return;
    }
    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
        this._dashing =
            this.isDashButtonPressed();
    } else {
        this._dashing = false;
    }
};