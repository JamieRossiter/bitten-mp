/** 
 * @file types.ts
 * @description Types
*/

import WebSocket from "ws";
import { MessageEventCode, MessageType } from "./enums";
import { Player, Room } from "./classes";

export type ConnectionQueryData = {
    socket: WebSocket.WebSocket,
    id: string,
    username: string,
    isHost: boolean,
    roomCode: string
}

export type PlayerRoom = {
    roomCode: string,
    player: Player
}

export type ServerMessage = {
    type: MessageType
    event: MessageEventCode,
    message: any
}

export type PlayerPos = {
    x: number,
    y: number,
    dir: number
}