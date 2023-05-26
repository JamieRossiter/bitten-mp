const inputKeyMapper_gameSystem_initialize_alias = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    inputKeyMapper_gameSystem_initialize_alias.call(this);
    this.disableMenu();
};

Input.keyMapper = {
    9: "tab", // tab
    13: "ok", // enter
    16: "shift", // shift
    17: "control", // control
    18: "control", // alt
    27: "escape", // escape
    32: "ok", // space
    33: "pageup", // pageup
    34: "pagedown", // pagedown
    65: "left", // left arrow
    87: "up", // up arrow
    68: "right", // right arrow
    83: "down", // down arrow
    84: "chat", // T
    90: "ok", // Z
    98: "down", // numpad 2
    100: "left", // numpad 4
    102: "right", // numpad 6
    104: "up", // numpad 8
    120: "debug" // F9
};