import { useState } from "react";
import { topics } from "../assets/topics";

const CreateRoomModal = ({ isOpen, setIsOpen }) => {
  const [topic, setTopic] = useState("");

  const closeModal = (e) => {
    if (e.target.id === "container") setIsOpen(false);
  };

  const handleTopic = (e) => setTopic(e.target.value);
  if (!isOpen) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#757575a6]"
      onClick={closeModal}
    >
      <form className="w-full max-w-[17rem]">
        <div className=" rounded-lg bg-white px-3 py-4">
          <h1 className="mb-4 text-lg font-bold text-blue-500">Create Room</h1>
          <div className="form-control w-full max-w-xs">
            <label
              htmlFor="countries"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              onChange={handleTopic}
              defaultValue="default"
              id="countries"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="default" disabled>
                Choose a topic
              </option>
              {topics.map((topic, i) => (
                <option value={topic} key={i}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <button className="mx-auto mt-4 block w-full max-w-[10rem] rounded-md bg-blue-500 py-1 font-semibold text-white">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomModal;
