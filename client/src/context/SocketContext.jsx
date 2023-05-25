import { createContext, useContext } from "react";
import {io} from "socket.io-client";

const socket = io("https://world-chat.onrender.com");
const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
