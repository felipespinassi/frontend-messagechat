import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io("https://pingapp.com.br/");
export const WebSocketContext = createContext<Socket>(socket);
