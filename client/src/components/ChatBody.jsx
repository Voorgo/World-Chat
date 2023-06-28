import React from "react";
import Message from "./Message";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useLocation } from "react-router-dom";

const ChatBody = () => {
  const socket = useSocket();
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const location = useLocation();
  const lastMessage = useRef(null);

  const handleMessages = (data) => {
    setMessagesReceived((state) => [
      ...state,
      {
        message: data.message,
        username: data.username,
        createdtime: data.createdtime,
      },
    ]);
  };
  useEffect(() => {
    socket.on("receive_message", handleMessages);
    return () => socket.off("receive_message", handleMessages);
  }, [socket]);

  useEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesRecieved]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  return (
    <div className="scrollbar pattern relative flex h-[65vh] flex-col items-center gap-4 overflow-y-scroll rounded-xl bg-scroll p-4 sm:h-[85vh]">
      {messagesRecieved.map((msg, i) => {
        return (
          <Message
            username={msg.username}
            key={i}
            message={msg.message}
            sender={location.state.username === msg.username}
            time={formatDateFromTimestamp(msg.createdtime)}
          />
        );
      })}
      <div ref={lastMessage}></div>
    </div>
  );
};

export default ChatBody;
