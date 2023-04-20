"use strict";
/**
 * @class
 * @description A server-side representation of a player
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(init) {
        this._id = init.id;
        this._username = init.username;
        this._isHost = init.isHost;
        this._socket = init.socket;
        this._pos = { x: 0, y: 0, dir: 2 };
    }
    sendMessage(event, message) {
        this._socket.send(JSON.stringify({ event, message }));
    }
    setDirection(dir) {
        if (dir != 2 && dir != 4 && dir != 6 && dir != 8) {
            this._pos.dir = 2;
            return;
        }
        this._pos.dir = dir;
    }
    setX(x) {
        this._pos.x = x;
    }
    setY(y) {
        this._pos.y = y;
    }
    get id() {
        return this._id;
    }
    get username() {
        return this._username;
    }
    get isHost() {
        return this._isHost;
    }
    get socket() {
        return this._socket;
    }
    get x() {
        return this._pos.x;
    }
    get y() {
        return this._pos.y;
    }
    get dir() {
        return this._pos.dir;
    }
}
exports.default = Player;
