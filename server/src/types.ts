/** 
 * @file types.ts
 * @description Types
*/

import WebSocket from "ws";
import { MessageEventCode } from "./enums";
import Player from "./classes/Player";

export type PlayerInit = {
    socket: WebSocket.WebSocket,
    id: string,
    username: string,
    isHost: boolean,
    room: string
}

export type RoomCodeToPlayerMap = {
    [ roomCode: string ]: Set<Player>
}

export type ServerMessage = {
    event: MessageEventCode,
    message: any
}

export type PlayerDisconnectMessage = {
    playerId: string,
    code: number,
    message: string
}

export type PlayerPos = {
    x: number,
    y: number,
    dir: number
}