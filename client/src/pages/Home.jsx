import Scene from "../components/Scene";
import Sidebar from "../components/Sidebar";
import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { DataContext } from "../context/AuthContext";

const Home = () => {
  const { setData } = DataContext();
  const socket = useSocket();

  useEffect(() => {
    socket.emit("render");
    socket.on("getRooms", (data) => {
      setData(data);
    });
    return () => socket.off("getRooms");
  }, [socket]);

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#272D41] via-[#000519] to-[#0e1516]">
      <div className="relative flex h-full w-full flex-col-reverse sm:flex-row">
        <Sidebar />
        <Scene />
      </div>
    </div>
  );
};

export default Home;
