import Room from "./Room";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "../context/AuthContext";

const RoomsModal = ({ isOpen, setIsOpen, country }) => {
  const { data } = DataContext();
  const closeModal = (e) => {
    if (e.target.id === "rooms") {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div
      id="rooms"
      onClick={closeModal}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#757575a6]"
    >
      <div className="w-full max-w-[20rem] cursor-default">
        <div className="rounded-lg bg-white px-3 py-4">
          <ul className="flex w-full flex-col">
            <h2 className="mb-2 px-3 text-sm font-bold xs:text-lg">
              {country} rooms
            </h2>
            <li className="mb-5 grid grid-cols-3 px-2 xs:px-3">
              <div className="text-sm font-bold xs:text-base">Topic</div>
              <div className="text-sm font-bold xs:text-base">Created by</div>
              <div className="text-center text-sm font-bold xs:text-base">
                Actions
              </div>
            </li>
            {data
              .filter((obj) => obj.location === country)
              .map((obj) =>
                obj.rooms.map((room) => <Room room={room} key={uuidv4()} />)
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomsModal;
