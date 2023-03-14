import Scene from "../components/Scene";
import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUser({
        name: decoded.name,
        email: decoded.email,
        isAdmin: decoded.admin,
      });
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUser({
          name: decoded.name,
          email: decoded.email,
          isAdmin: decoded.admin,
        });
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    refreshToken();
    // getUsers();
  }, []);

  // const getUsers = async () => {
  //   const response = await axiosJWT.get("http://localhost:5000/users", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   setUsers(response.data);
  // };

  return (
    <div className="h-[100vh] w-full bg-gradient-to-b from-[#272D41] via-[#000519] to-[#0e1516]">
      <div className="flex h-full w-full">
        <Sidebar user={user} />
        <Scene />
      </div>
    </div>
  );
};

export default Home;
