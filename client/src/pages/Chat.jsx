import ChatBody from "../components/ChatBody";
import ChatInput from "../components/ChatInput";
import ChatSideBar from "../components/ChatSideBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = (e) => {
      navigate("/", { replace: true });
    };
  }, []);
  return (
    <div className="grid h-[100svh] grid-rows-[60px_4fr] gap-3 bg-gray-200 p-3 sm:grid-cols-[1fr_4fr] sm:h-[100svh] sm:grid-rows-none">
      <ChatSideBar />
      <div className="rounded-xl bg-white">
        <ChatBody />
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
