/** 
 * @class
 * @description The WebSockets server that handles all incoming and outgoing requests to all connected clients
*/

import { WebSocketServer } from "ws"; 
import { logServerMessage } from "../utils";
import Player from "./Player";
import Room from "./Room";
import { RoomCodeToPlayerMap } from "../types";
import { MessageEventCode } from "../enums";

class Server {

    private _io: WebSocketServer
    private _port: number;
    private _rooms: Set<Room>;
    private _players: Set<Player>;
    private _roomCodeToPlayerMap: RoomCodeToPlayerMap; 

    constructor(port: number){
        this._port = port;
        this._io = this.createServer(port);
        this._rooms = new Set();
        this._players = new Set();
        this._roomCodeToPlayerMap = {};
        this.printServerMessage();
    }

    private createServer(port: number): WebSocketServer {
        return new WebSocketServer({ port });
    }

    private printServerMessage(): void{
        logServerMessage(`Server is running on port ${this._port}`);
    }

    public addPlayer(player: Player): void {
        this._players.add(player);
    }

    public removePlayer(player: Player): void {
        this.players.delete(player);
    }

    public addRoom(room: Room): void {
        this._rooms.add(room);
        this._roomCodeToPlayerMap[room.code] = new Set();
    }

    public removeRoom(room: Room): void {
        this._rooms.delete(room);
        delete this._roomCodeToPlayerMap[room.code];
    }

    public addPlayerToRoom(player: Player, room: Room): void {
        this._roomCodeToPlayerMap[room.code].add(player);

    }

    public removePlayerFromRoom(player: Player, room: Room): void {
        this._roomCodeToPlayerMap[room.code].delete(player);
    }

    public getCurrentRoomOfPlayer(player: Player) : Room | undefined {
        const targetRoomPlayerPair: [string, Set<Player>] | undefined = Object.entries(this._roomCodeToPlayerMap).find((roomPlayerPair: [string, Set<Player>]) => {
            return Array.from(roomPlayerPair[1]).includes(player)
        });
        if(!targetRoomPlayerPair) return;
        return this.findRoomByCode(targetRoomPlayerPair[0]);
    }

    public getCurrentPlayersInRoom(room: Room): Set<Player> {
        return this._roomCodeToPlayerMap[room.code];
    }

    public findPlayerById(playerId: string): Player | undefined {
        return Array.from(this._players).find((player: Player) => player.id === playerId);
    }

    public findRoomByCode(roomCode: string): Room | undefined {
        return Array.from(this._rooms).find((room: Room) => room.code === roomCode);
    }
    
    public broadcastMessageToRoom(room: Room, event: MessageEventCode, message: object): void {
        Array.from(this._roomCodeToPlayerMap[room.code]).forEach((player: Player) => player.socket.send(JSON.stringify({ event, message })));
    }

    get io(): WebSocketServer {
        return this._io;
    }

    get players(): Set<Player>{
        return this._players;
    }

    get rooms(): Set<Room>{
        return this._rooms;
    }

}

export default Server;