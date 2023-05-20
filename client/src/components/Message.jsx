import React from "react";

const Message = ({ username, time, message, sender }) => {
  return (
    <div
      className={`flex w-full max-w-[400px] flex-col gap-3 ${
        sender
          ? "self-end rounded-l-lg rounded-br-lg bg-[#015fff] text-white  "
          : "self-start rounded-r-lg rounded-bl-lg bg-[#eceaed]"
      } p-[5px_10px_10px_10px]`}
    >
      <div className="flex items-start justify-between">
        <div className="text-xs leading-4 sm:text-sm">
          {sender ? "You" : username}
        </div>
        <div className="text-xs leading-4 sm:text-sm">{time}</div>
      </div>
      <div className="text-xs [word-break:break-word] sm:text-base">
        {message}
      </div>
    </div>
  );
};

export default Message;
