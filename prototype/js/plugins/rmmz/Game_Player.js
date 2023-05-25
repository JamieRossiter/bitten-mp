const onlinePlayer_gamePlayer_executeMove_alias = Game_Player.prototype.executeMove;
/**
 * @external
 * @memberof Game_Player
 * @param {number} direction
 * @description Broadcasts the player's position during the execute move method 
 */
Game_Player.prototype.executeMove = function(direction) {
    if(!$gameServer.isConnected || $gameServer.connectionError) return;
    onlinePlayer_gamePlayer_executeMove_alias.call(this, direction);
    $gameRoom.broadcastPlayerMoveStraight({x: $gamePlayer.x, y: $gamePlayer.y, dir: direction});
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