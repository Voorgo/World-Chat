import { useState } from "react";
import axios from "axios";
import CreateRoomButton from "./CreateRoomButton";
import CreateRoomModal from "./CreateRoomModal";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/AuthContext";
import AllRoomsModal from "./AllRoomsModal";
import { getRoomsTotal } from "../utils/getRoomsTotal";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Sidebar = () => {
  const { user, data } = DataContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isAllRoomsOpen, setIsAllRoomsOpen] = useState(false);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.delete("https://world-chat.onrender.com/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      id="default-sidebar"
      className="relative w-full transition-transform sm:top-0 sm:h-screen sm:w-auto"
      aria-label="Sidebar"
    >
      <CreateRoomModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full overflow-y-auto bg-gray-800 px-3 py-1 sm:h-full sm:w-64 sm:py-4">
        <ul className="flex items-center justify-between sm:block sm:space-y-2">
          <li className="basis-full">
            <div className="flex flex-col items-center rounded-lg p-2 text-base font-normal text-white sm:flex-row">
              <svg
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-400 transition  duration-75 sm:h-6 sm:w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sm:ml-3">{user.name}</span>
            </div>
          </li>
          <li className="basis-full">
            <div
              onClick={() => setIsAllRoomsOpen(true)}
              className="flex cursor-pointer flex-col items-center rounded-lg p-2 text-base font-normal text-white  hover:bg-gray-700 sm:flex-row"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-400 transition duration-75 group-hover:text-white sm:h-6 sm:w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="flex-1 whitespace-nowrap sm:ml-3">
                <div>Rooms</div>
              </span>
              <span className="ml-3 hidden h-3 w-3 items-center justify-center rounded-full bg-blue-900 p-3  text-sm font-medium text-blue-300  sm:inline-flex">
                {getRoomsTotal(data)}
              </span>
            </div>
          </li>
          {user.guest ? (
            [
              <Link to="/login" className="basis-full" key={uuidv4()}>
                <li>
                  <div className="flex cursor-pointer flex-col items-center rounded-lg p-2 text-base font-normal text-white  hover:bg-gray-700 sm:flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 flex-shrink-0 text-gray-400 transition  duration-75 group-hover:text-white  sm:h-6 sm:w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>

                    <span className="flex-1 whitespace-nowrap sm:ml-3">
                      Sign In
                    </span>
                  </div>
                </li>
              </Link>,
              <Link to="/register" className="basis-full" key={uuidv4()}>
                <li>
                  <div className="flex cursor-pointer flex-col items-center rounded-lg p-2 text-base font-normal text-white  hover:bg-gray-700 sm:flex-row">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-gray-400 transition  duration-75 group-hover:text-white  sm:h-6 sm:w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 whitespace-nowrap sm:ml-3">
                      Sign Up
                    </span>
                  </div>
                </li>
              </Link>,
            ]
          ) : (
            <li className="basis-full">
              <div
                onClick={logout}
                className="flex cursor-pointer flex-col items-center rounded-lg p-2 text-base font-normal text-white  hover:bg-gray-700 sm:flex-row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 flex-shrink-0 text-gray-400 transition  duration-75 group-hover:text-white  sm:h-6 sm:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>

                <span className="flex-1 whitespace-nowrap sm:ml-3">
                  Sign Out
                </span>
              </div>
            </li>
          )}
          <CreateRoomButton setIsOpen={setIsOpen} />
        </ul>
        <AllRoomsModal
          open={isAllRoomsOpen}
          setIsAllRoomsOpen={setIsAllRoomsOpen}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
