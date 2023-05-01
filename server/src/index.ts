/**
 * @file index.ts
 * @author Jamie Rossiter
*/

import WebSocket from "ws";
import http from "http";
import { Player, Room, Server, PlayerManager, RoomManager} from "./classes"
import { connectPlayerToServer, extractPlayerData, disconnectPlayerFromServer, assignPlayerToRoom, unassignPlayerFromRoom } from "./helpers";
import { ConnectionQueryData } from "./types";
import { logServerMessage } from "./utils";
import { MessageEventCode } from "./enums";

const server: Server = new Server(5000);
const playerManager: PlayerManager = new PlayerManager();
const roomMananger: RoomManager = new RoomManager();

/* Connection listener */
server.io.on("connection", (socket: WebSocket.WebSocket, req: http.IncomingMessage) => {

    // Create current player and room
    const connQueryData: ConnectionQueryData = extractPlayerData(socket, req);
    const player: Player = new Player(connQueryData);
    let room: Room | undefined;
    
    // Assign the player to a new or existing room, handle if cannot
    room = assignPlayerToRoom(roomMananger, connQueryData.room, player);
    if(!room){
        logServerMessage(`There was an error assigning player ${player.username}(${player.id}) to a room.`);

        // If the player is attempting to join a room that doesn't exist, let them know
        player.sendMessage(MessageEventCode.RoomNoExist, { RoomCode: connQueryData.room }); 
        return;
    }

    // Connect the player to the server
    connectPlayerToServer(playerManager, roomMananger, player, room);

    // Handle disconnection
    socket.on("close", (closeCode: number) => {

        // Unassign player from room
        unassignPlayerFromRoom(roomMananger, room as Room, player, closeCode);

        // Disconnect player from the server
        disconnectPlayerFromServer(playerManager, player, closeCode);
    })
    
})