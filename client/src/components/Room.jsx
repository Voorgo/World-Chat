import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { DataContext } from "../context/AuthContext";

const Room = ({ room }) => {
  const { user } = DataContext();
  const navigate = useNavigate();
  const socket = useSocket();

  const joinRoom = () => {
    socket.emit("joinRoom", { ...room, user: user.name });
    navigate(`/room/${room.room}`, { state: { username: user.name, room: room.room } });
  };

  const deleteRoom = () => {
    socket.emit("deleteRoom", { room });
  };

  return (
    <li className="grid grid-cols-3 rounded bg-gray-100 p-2 xs:p-3">
      <div className="self-center overflow-ellipsis text-sm font-semibold xs:text-base">
        {room.topic}
      </div>
      <div className="self-center overflow-ellipsis text-sm font-semibold xs:text-base">
        {room.user}
      </div>
      <div className="flex gap-2">
        <button
          className="w-full rounded bg-green-500 font-semibold text-white"
          onClick={joinRoom}
        >
          Join
        </button>
        {user.isAdmin ? (
          <button
            className="flex h-6 w-6 items-center justify-center rounded bg-red-500 p-1 text-white"
            onClick={deleteRoom}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </li>
  );
};

export default Room;
