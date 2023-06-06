const rmmz_gamePlayer_initialize_alias = Game_Player.prototype.initialize;
/**
 * @external
 */
Game_Player.prototype.initialize = function(){
    rmmz_gamePlayer_initialize_alias.call(this);   
    /**
     * @private
     * @desc Is the player currently moving (i.e. movement input has been pressed and not released)
     * @type {boolean}
     */
    this._isCurrentlyMoving = false;
    /**
     * @private
     * @desc The direction the player was last travelling in when they started moving or changed directions
     */
    this._mostPreviousDirection = 0;
    /**
     * @private
     * @constant
     * @desc The number of frames before the player is considered stopped
     */
    this._stopCountThreshold = 1;
}

const rmmz_gamePlayer_update_alias = Game_Player.prototype.update;
/**
 * @external
 * @memberof Game_Player
 * @param {boolean} sceneActive 
 */
Game_Player.prototype.update = function(sceneActive){
    rmmz_gamePlayer_update_alias.call(this, sceneActive)

    if(!$gameRoom.currentPlayer) return;
    
    if(!this._isCurrentlyMoving && this.isMoving()){
        // If the player starts moving
        this._isCurrentlyMoving = true;
        this._mostPreviousDirection = this.direction();
        $gameRoom.broadcastPlayerIsMoving(true, this.direction(), this._x, this._y);

    } else if (this._isCurrentlyMoving && (this.direction() !== this._mostPreviousDirection)){
        // If the player changes directions
        this._mostPreviousDirection = this.direction();
        $gameRoom.broadcastPlayerIsMoving(true, this.direction(), this._x, this._y);

    } else if (this._isCurrentlyMoving && this._stopCount > this._stopCountThreshold){
        // If the player stops
        this._isCurrentlyMoving = false;
        $gameRoom.broadcastPlayerIsMoving(false, this.direction(), this._x, this._y);
    }

}

/**
 * @external
 * @override
 * @param {number} d 
 */
Game_Player.prototype.moveStraight = function(d) {
    if($gameRoom.currentPlayer.isDead) return;
    if (this.canPass(this.x, this.y, d)) {
        this._followers.updateMove();
    }
    Game_Character.prototype.moveStraight.call(this, d);
};

/**
 * @external
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