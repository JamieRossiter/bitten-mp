/** 
 * @external
 * @description Aliases the initialize function of Game_CharacterBase to add extra members
*/
const onlinePlayer_gameCharacterBase_initialize_alias = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
    onlinePlayer_gameCharacterBase_initialize_alias.call(this);
    this._usernameWindow = null;
}

/** 
 * @external
 * @description Creates a username window that follows the character around
*/
Game_CharacterBase.prototype.createUsernameWindow = function(){
    this._usernameWindow = new Window_Username(this);
    SceneManager._scene.addChild(this._usernameWindow);
}

/** 
 * @external
 * @description Destroys the username window
*/
Game_CharacterBase.prototype.destroyUsernameWindow = function(){
    SceneManager._scene.removeChild(this._usernameWindow);
    this._usernameWindow = null;
}