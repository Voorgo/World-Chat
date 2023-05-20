import React from "react";
import { SocketContextProvider } from "../context/SocketContext";
import { Outlet } from "react-router-dom";
import Provider from "../context/AuthContext";

const Root = () => {
  return (
    <>
      <Provider>
        <SocketContextProvider>
          <Outlet />
        </SocketContextProvider>
      </Provider>
    </>
  );
};

export default Root;
