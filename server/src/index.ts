/**
 * @file index.ts
 * @author Jamie Rossiter
*/

import WebSocket from "ws";
import http from "http";
import Player from "./classes/Player";
import Server from "./classes/Server";
import { handleServerConnection, extractPlayerInitData, handleServerDisconnection, handleRoomAssignment, handleRoomDeassignment } from "./helpers";

const server = new Server(3000);

/* Connection listener */
server.io.on("connection", (socket: WebSocket.WebSocket, req: http.IncomingMessage) => {

    // Create current player
    const playerInit = extractPlayerInitData(socket, req);
    const player = new Player(playerInit);
    
    // Handle connection
    handleServerConnection(server, player);
    handleRoomAssignment(server, playerInit.room, player);

    // Handle disconnection
    socket.on("close", (closeCode: number) => {
        handleServerDisconnection(server, player, closeCode);
        handleRoomDeassignment(server, player);
    })
    
})