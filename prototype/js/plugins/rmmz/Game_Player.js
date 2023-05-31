const rmmz_gamePlayer_initialize_alias = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function(){
    rmmz_gamePlayer_initialize_alias.call(this);   
    this._isCurrentlyMoving = false;
    this._mostPreviousDirection = 0;
    this._stopCountThreshold = 1;
}

const rmmz_gamePlayer_update_alias = Game_Player.prototype.update;
/**
 * @param {boolean} sceneActive 
 */
Game_Player.prototype.update = function(sceneActive){
    rmmz_gamePlayer_update_alias.call(this, sceneActive)

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