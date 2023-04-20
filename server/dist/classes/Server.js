"use strict";
/**
 * @class
 * @description The WebSockets server that handles all incoming and outgoing requests to all connected clients
*/
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const utils_1 = require("../utils");
class Server {
    constructor(port) {
        this._port = port;
        this._io = this.createServer(port);
        this._rooms = new Set();
        this._players = new Set();
        this._roomCodeToPlayerMap = {};
        this.printServerMessage();
    }
    createServer(port) {
        return new ws_1.WebSocketServer({ port });
    }
    printServerMessage() {
        (0, utils_1.logServerMessage)(`Server is running on port ${this._port}`);
    }
    addPlayer(player) {
        this._players.add(player);
    }
    removePlayer(player) {
        this.players.delete(player);
    }
    addRoom(room) {
        this._rooms.add(room);
        this._roomCodeToPlayerMap[room.code] = new Set();
    }
    removeRoom(room) {
        this._rooms.delete(room);
        delete this._roomCodeToPlayerMap[room.code];
    }
    addPlayerToRoom(player, room) {
        this._roomCodeToPlayerMap[room.code].add(player);
    }
    removePlayerFromRoom(player, room) {
        this._roomCodeToPlayerMap[room.code].delete(player);
    }
    getCurrentRoomOfPlayer(player) {
        const targetRoomPlayerPair = Object.entries(this._roomCodeToPlayerMap).find((roomPlayerPair) => {
            return Array.from(roomPlayerPair[1]).includes(player);
        });
        if (!targetRoomPlayerPair)
            return;
        return this.findRoomByCode(targetRoomPlayerPair[0]);
    }
    getCurrentPlayersInRoom(room) {
        return this._roomCodeToPlayerMap[room.code];
    }
    findPlayerById(playerId) {
        return Array.from(this._players).find((player) => player.id === playerId);
    }
    findRoomByCode(roomCode) {
        return Array.from(this._rooms).find((room) => room.code === roomCode);
    }
    broadcastMessageToRoom(room, event, message) {
        Array.from(this._roomCodeToPlayerMap[room.code]).forEach((player) => player.socket.send(JSON.stringify({ event, message })));
    }
    get io() {
        return this._io;
    }
    get players() {
        return this._players;
    }
    get rooms() {
        return this._rooms;
    }
}
exports.default = Server;
