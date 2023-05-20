import { useState } from "react";
import { topics } from "../assets/topics";
import { capitals } from "../assets/capitals";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { DataContext } from "../context/AuthContext";

const CreateRoomModal = ({ isOpen, setIsOpen }) => {
  const { user } = DataContext();
  const [topic, setTopic] = useState("");
  const socket = useSocket();
  const [room, setRoom] = useState("");
  const [location, setLocation] = useState({});
  const navigate = useNavigate();

  const closeModal = (e) => {
    if (e.target.id === "container") {
      setIsOpen(false);
      setRoom("");
      setTopic("");
      setLocation("");
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (room != "" && Object.keys(location).length > 0) {
      socket.emit("getRooms", { user: user.name, topic, room, location });
      socket.emit("joinRoom", { user: user.name, topic, room, location });
      navigate(`/room/${room}`, { state: { username: user.name } });
    } else {
      setRoom("");
      setTopic("");
      setLocation("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#757575a6]"
      onClick={closeModal}
    >
      <form className="w-full max-w-[17rem]" onSubmit={handleForm}>
        <div className="rounded-lg bg-white px-3 py-4">
          <h1 className="mb-4 text-lg font-bold text-blue-500">Create Room</h1>
          <div className="w-full max-w-xs">
            <label
              htmlFor="topics"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <Select
              options={topics}
              onChange={(choice) => {
                setTopic(choice.value);
                setRoom(choice.value + uuidv4());
              }}
            />
            <div className="mt-5">
              <label
                htmlFor="countries"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Select pin location
              </label>
              <Select
                id="countries"
                options={capitals}
                onChange={(choice) => setLocation(choice)}
              />
            </div>
          </div>
          <button
            disabled={
              room != "" && Object.keys(location).length > 0 ? false : true
            }
            className="mx-auto mt-4 block w-full max-w-[10rem] rounded-md bg-blue-500 py-1 font-semibold text-white disabled:bg-gray-500"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomModal;
