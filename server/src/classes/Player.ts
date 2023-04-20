/** 
 * @class
 * @description A server-side representation of a player
*/

import WebSocket from "ws";
import { PlayerInit, PlayerPos } from "../types";
import Room from "./Room";
import { MessageEventCode } from "../enums";

class Player {

    private _id: string;
    private _username: string;
    private _isHost: boolean;
    private _socket: WebSocket.WebSocket;
    private _pos: PlayerPos;

    constructor(init: PlayerInit){
        this._id = init.id;
        this._username = init.username;
        this._isHost = init.isHost;
        this._socket = init.socket;
        this._pos = { x: 0, y: 0, dir: 2 };
    }

    public sendMessage(event: MessageEventCode, message: object): void{
        this._socket.send(JSON.stringify( {event, message} ));
    }

    public setDirection(dir: number): void{
        if(dir != 2 && dir != 4 && dir != 6 && dir != 8) {
            this._pos.dir = 2;
            return;
        }
        this._pos.dir = dir;
    }

    public setX(x: number): void {
        this._pos.x = x;
    }

    public setY(y: number): void {
        this._pos.y = y;
    }

    get id(): string {
        return this._id;
    }

    get username(): string {
        return this._username;
    }

    get isHost(): boolean {
        return this._isHost;
    }

    get socket(): WebSocket.WebSocket {
        return this._socket;
    }

    get x(): number {
        return this._pos.x;
    }

    get y(): number {
        return this._pos.y;
    }

    get dir(): number {
        return this._pos.dir;
    }

}

export default Player;
