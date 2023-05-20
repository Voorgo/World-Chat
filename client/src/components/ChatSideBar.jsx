import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { DataContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const ChatSideBar = () => {
  const [roomInfo, setRoomInfo] = useState({});
  const [users, setUsers] = useState([]);
  const { user } = DataContext();
  const socket = useSocket();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLeaveChat = () => {
    socket.emit("leave_room", {
      room: id,
      user: user.name,
    });
    navigate("/", { replace: true });
  };

  useEffect(() => {
    socket.on("chatroom_info", (data) => {
      setRoomInfo((prev) => ({
        ...prev,
        topic: data.topic,
      }));
    });
    return () => socket.off("chatroom_info");
  }, [socket]);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data.users);
    });
    return () => socket.off("users");
  }, [socket]);

  return (
    <div className="flex flex-row-reverse items-center gap-1 rounded-xl bg-white py-2 px-4 sm:flex-col sm:justify-start sm:gap-4 sm:p-4">
      <div className="order-2 basis-full text-center sm:order-none sm:basis-auto">
        <h1 className="text-base font-semibold sm:order-none sm:basis-auto sm:text-xl">
          {roomInfo.topic}
        </h1>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium">
        Users
        <div className="group relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 22 22"
            strokeWidth="1.5"
            stroke="currentColor"
            className="relative h-3 w-3 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <div className="absolute top-full z-50 mt-4 hidden -translate-x-full rounded-md bg-[#3b3b3ba6] p-2 text-white group-hover:block">
            <ul className="flex flex-col gap-2">
              {users.map((user) => (
                <li key={uuidv4()}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="order-3 sm:order-none  sm:flex sm:w-full sm:justify-center">
        <button
          onClick={handleLeaveChat}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-400 font-semibold  text-white hover:bg-red-500 sm:w-[100px] sm:max-w-none  sm:rounded-lg  sm:py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 xs:h-6 xs:w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatSideBar;
