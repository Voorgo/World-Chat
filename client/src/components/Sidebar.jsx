import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      id="default-sidebar"
      className="absolute top-0 left-0 z-40 h-screen w-64 max-w-[16rem] -translate-x-full transition-transform sm:relative sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full w-64 overflow-y-auto  bg-gray-800 px-3 py-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="#"
              className="flex items-center rounded-lg p-2 text-base font-normal  text-white hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0  text-gray-400 transition  duration-75 group-hover:text-white"
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
              <span className="ml-3">{user.name}</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base font-normal  text-white hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 text-gray-400 transition duration-75 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Rooms</span>
              <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full  bg-blue-900 p-3 text-sm  font-medium text-blue-300">
                3
              </span>
            </a>
          </li>
          <li>
            <Link
              to="/login"
              className="flex items-center rounded-lg p-2 text-base font-normal  text-white hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0  text-gray-400 transition duration-75 group-hover:text-white"
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
              <span className="ml-3 flex-1 whitespace-nowrap">Sign In</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center rounded-lg p-2 text-base font-normal  text-white hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0  text-gray-400 transition  duration-75 group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Sign Up</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={logout}
              className="flex items-center rounded-lg p-2 text-base font-normal  text-white hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0  text-gray-400 transition  duration-75 group-hover:text-white"
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
              <span className="ml-3 flex-1 whitespace-nowrap">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
