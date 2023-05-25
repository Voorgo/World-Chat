import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({});

const Provider = ({ children }) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  let location = useLocation();

  const refreshToken = async () => {
    try {
      const response = await axios.get("https://world-chat.onrender.com/token");
      if (!response.data.accessToken) {
        setUser({
          name: "Guest",
          isAdmin: false,
          guest: true,
        });
      } else {
        const decoded = jwt_decode(response.data.accessToken);
        setUser({
          name: decoded.name,
          email: decoded.email,
          isAdmin: decoded.admin,
          guest: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshToken();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};

export function DataContext() {
  return useContext(AuthContext);
}

export default Provider;
