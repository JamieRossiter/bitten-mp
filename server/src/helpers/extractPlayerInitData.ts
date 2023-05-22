/**
 * @file extractPlayerInitData.ts
 * @description Functions for extracting player init data from a handshake query
*/

import WebSocket from "ws";
import http from "http";
import { generateRandomFixedInteger, generateRandomAlphanumericalString } from "../utils";
import { ConnectionQueryData } from "../types";

export function extractPlayerData(socket: WebSocket.WebSocket, req: http.IncomingMessage) {

    let url: string = "";
    if(req.url) url = req.url;

    const query: object = getQueryFromUrl(url);

    return validatePlayerInitData(query, socket);
}

function getQueryFromUrl(url: string): object {

    let query: any = {};
    const rawParams: string[] = url.split("/?")[1].split("&");

    rawParams.forEach((param: string) => {
        if(param.includes("%20")) param = param.replace(/%20/g, " "); // Check if params include spaces
        if(param.includes("%22")) param = param.replace(/%22/g, '"'); // Check if params include spaces

        const splitParam: string[] = param.split("="); 
        query[splitParam[0]] = splitParam[1];
    });

    return query;

}

function validatePlayerInitData(query: object, socket: WebSocket.WebSocket): ConnectionQueryData {

    const initData: ConnectionQueryData = { 
        socket: socket, 
        id: generateRandomAlphanumericalString(10), 
        username: `User#${generateRandomFixedInteger(6)}`, 
        isHost: false,
        roomCode: "",
        position: {x: 0, y: 0, dir: 0}
    };
    
    if("username" in query){
        if(query.username) initData.username = query.username.toString();
    }
    if("isHost" in query){
        initData.isHost = (query.isHost === "true"); // convert to boolean
    }
    if("roomCode" in query){
        if(query.roomCode) initData.roomCode = query.roomCode.toString();
    }
    if("position" in query){
        if(query.position){
            const playerPositionString: string = query.position as string;
            initData.position = JSON.parse(playerPositionString);
        }
    }

    return initData;

}