import { createContext, useContext } from "react";
import {io} from "socket.io-client";

const socket = io("ws://world-chat.onrender.com", { transports: ['websocket', 'polling', 'flashsocket'] });
const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
