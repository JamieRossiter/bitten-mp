/**
 * @namespace Game_Room 
 * @description Contains all methods relating to broadcasting events from within the room to the server
 */

Game_Room.prototype.broadcastPlayerIsMoving = function(isMoving, dir, x, y){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.PlayerIsMoving,
        { PlayerId: this._currentPlayer.id, IsMoving: isMoving, Dir: dir, X: x, Y: y}
    )
}

/**
 * @param {string} chatMessage 
 */
Game_Room.prototype.broadcastChatMessage = function(chatMessage){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.ChatMessage,
        { PlayerId: this._currentPlayer.id, ChatMessage: chatMessage }
    )
}

/**
 * @param {boolean} isTyping 
 */
Game_Room.prototype.broadcastPlayerIsTyping = function(isTyping){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.PlayerIsTyping,
        { PlayerId: this._currentPlayer.id, IsTyping: isTyping }
    )
}

/**
 * @param {Game_OnlinePlayer} player 
 * @param {number} role 
 */
Game_Room.prototype.broadcastRoleInformation = function(role, player){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.RoleInformation,
        { PlayerId: this._currentPlayer.id, TargetPlayerId: player.id, Role: role, Disguise: player.npcDisguise }
    )
}

Game_Room.prototype.broadcastTogglePlayerDisguise = function(isDisguised){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.TogglePlayerDisguise,
        { PlayerId: this._currentPlayer.id, IsDisguised: isDisguised }
    )
}

/**
 * @param {number} mapId 
 * @param {{x: number, y: number, dir: number}} coords 
 */
Game_Room.prototype.broadcastMapTransfer = function(mapId, coords){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.MapTransfer,
        { HostId: this._currentPlayer.id, MapId: mapId, X: coords.x, Y: coords.y, Dir: coords.dir }
    )
}

Game_Room.prototype.broadcastActivateNpcs = function(){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.ActivateNpcs,
        { 
            HostId: this._currentPlayer.id, 
            NpcData: this.getNpcs().map(filteredEv => { 
                return {
                    Id: filteredEv.eventId(),
                    Path: filteredEv.getCurrentPath()
                }
        }
    )});
}

Game_Room.prototype.broadcastNpcStateChange = function(npcId, targetState){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.NpcStateChange,
        {
            PlayerId: this._currentPlayer.id,
            NpcId: npcId,
            TargetState: targetState
        }
    )
}

Game_Room.prototype.broadcastPlayerDeath = function(player){
    $gameServer.broadcastMessageToRoom(
        BroadcastMessageEventCode.PlayerDeath,
        {
            PlayerId: this._currentPlayer.id,
            TargetPlayerId: player.id
        }
    )
}

