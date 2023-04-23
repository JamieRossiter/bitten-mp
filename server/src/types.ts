/** 
 * @file types.ts
 * @description Types
*/

import WebSocket from "ws";
import { MessageEventCode } from "./enums";
import { Player, Room } from "./classes";

export type ConnectionQueryData = {
    socket: WebSocket.WebSocket,
    id: string,
    username: string,
    isHost: boolean,
    room: string
}

export type PlayerRoom = {
    roomCode: string,
    player: Player
}

export type ServerMessage = {
    event: MessageEventCode,
    message: any
}

export type PlayerPos = {
    x: number,
    y: number,
    dir: number
}