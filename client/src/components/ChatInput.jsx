import React from "react";
import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useLocation } from "react-router-dom";

const ChatInput = () => {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const location = useLocation();

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      const createdtime = Date.now();
      socket.emit("send_message", {
        message,
        createdtime,
        username: location.state.username,
      });
      setMessage("");
    }
  };

  return (
    <form
      className="mt-2 flex justify-center gap-4 rounded-xl"
      onSubmit={sendMessage}
    >
      <input
        type="text"
        placeholder="Message..."
        className="w-full max-w-[60%] rounded-2xl bg-[#f6f6f6] py-1 indent-4 outline-none"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        maxLength="300"
      />
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 p-2 font-semibold text-white"
        onClick={sendMessage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
