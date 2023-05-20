import { createContext, useContext } from "react";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:5000");
const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
