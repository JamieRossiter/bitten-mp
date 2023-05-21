/**
 * @external
 * @public @method
 * @param {number} direction 
 */

Game_Player.prototype.executeMove = function(direction) {
    this.moveStraight(direction);
    $gameRoom.broadcastPlayerPositionUpdate({x: this.x, y: this.y, dir: direction});
};