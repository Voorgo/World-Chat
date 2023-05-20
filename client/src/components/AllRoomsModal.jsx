import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Accordion } from "@szhsin/react-accordion";
import AccordionItem from "./AccordionItem";
import { DataContext } from "../context/AuthContext";
import Room from "./Room";

const AllRoomsModal = ({ open, setIsAllRoomsOpen }) => {
  const { data } = DataContext();

  const closeModal = (e) => {
    if (
      e.target.id === "container" ||
      e.target.id === "roomsButton" ||
      e.target.id === "closeButton" ||
      e.target.id === "path"
    ) {
      setIsAllRoomsOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#757575a6]"
      onClick={closeModal}
    >
      <div className="flex w-full max-w-[20rem] flex-col gap-2 rounded-lg bg-white px-3 py-4">
        <button
          id="roomsButton"
          className="flex h-6 w-6 items-center justify-center self-end rounded bg-red-500 p-1 text-white"
          onClick={closeModal}
        >
          <svg
            id="closeButton"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              id="path"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Accordion>
          {data.length === 0 ? (
            <p className="text-center font-bold">No rooms.</p>
          ) : (
            data.map((item) => (
              <AccordionItem
                key={uuidv4()}
                header={`${item.location}: ${item.rooms.length} ${
                  item.room?.length > 1 ? "rooms" : "room"
                }`}
              >
                {item.rooms.map((room) => (
                  <Room room={room} key={uuidv4()} />
                ))}
              </AccordionItem>
            ))
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default AllRoomsModal;
