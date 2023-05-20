const CreateRoomButton = ({ setIsOpen }) => {
  return (
    <div
      onClick={() => setIsOpen(true)}
      className="absolute -top-full right-3 z-50 flex cursor-pointer flex-col items-center rounded-full bg-[#2193f1] p-2 text-base font-normal text-white hover:bg-[#1773bf] sm:relative sm:right-0 sm:mx-auto sm:max-w-[80%] sm:cursor-pointer sm:rounded-lg  sm:p-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="h-8 w-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  );
};

export default CreateRoomButton;
