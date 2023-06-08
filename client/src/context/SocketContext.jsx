import { createContext, useContext, useEffect, useState } from "react";
import {io} from "socket.io-client";
const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  const [socket,setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("https://world-chat.onrender.com"))
   return () => socket.disconnect();
  }, [])
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
