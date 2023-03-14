import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPassword = (e) => {
    setConfPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: username,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      }
    }
  };
  return (
    <div className="mx-auto flex h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#272D41] via-[#000519] to-[#0e1516] px-0 xs:p-5">
      <div className="z-20 flex w-full max-w-[25rem] flex-col gap-4 bg-white px-4 py-2 xs:rounded-lg xs:py-8 xs:px-12">
        <div>
          <h1 className="font-nosfier mb-3 text-center text-2xl font-bold xs:mb-5 xs:text-3xl">
            Sign Up
          </h1>
          {error ? (
            <div className="mb-4 text-center text-xs font-semibold text-red-600 xs:text-sm">
              {error}
            </div>
          ) : null}
          <form className="flex flex-col gap-6" onSubmit={register}>
            <div className="relative z-0">
              <input
                title=""
                type="text"
                value={username}
                onChange={(e) => handleUsername(e)}
                aria-label="Enter username"
                id="username"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 xs:text-base"
                placeholder=" "
                required
              />
              <label
                htmlFor="username"
                className="z-2 absolute top-3 origin-[0] -translate-y-[1.3rem] scale-75 transform text-sm font-semibold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-[1.3rem] peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 xs:text-base"
              >
                Username
              </label>
            </div>
            <div className="relative z-0">
              <input
                title=""
                type="email"
                value={email}
                onChange={(e) => handleEmail(e)}
                aria-label="Enter email"
                id="email"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 xs:text-base"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="z-2 absolute top-3 origin-[0] -translate-y-[1.3rem] scale-75 transform text-sm font-semibold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-[1.3rem] peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 xs:text-base"
              >
                Email
              </label>
            </div>
            <div className="relative z-0">
              <input
                title=""
                type="password"
                value={confPassword}
                onChange={(e) => handleConfPassword(e)}
                aria-label="Enter confirm password"
                id="confirm-password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 xs:text-base"
                placeholder=" "
                required
              />
              <label
                htmlFor="confirm-password"
                className="z-2 absolute top-3 origin-[0] -translate-y-[1.3rem] scale-75 transform text-sm font-semibold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-[1.3rem] peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 xs:text-base"
              >
                Confirm Password
              </label>
            </div>
            <div className="relative z-0">
              <input
                title=""
                type="password"
                value={password}
                onChange={(e) => handlePassword(e)}
                aria-label="Enter password"
                id="password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 xs:text-base"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="z-2 absolute top-3 origin-[0] -translate-y-[1.3rem] scale-75 transform text-sm font-semibold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-[1.3rem] peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 xs:text-base"
              >
                Password
              </label>
            </div>
            <button className="rounded bg-blue-600 px-3 py-2 text-sm font-bold text-white xs:px-6 xs:py-3 xs:text-xl">
              Sign Up
            </button>
          </form>
        </div>
        <div className="bg-white px-0 py-1 text-center text-xs font-semibold xs:px-10 xs:py-2 xs:text-base">
          <p>
            Have an account?{" "}
            <Link to="/login" className="font-bold text-[#0095f6]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
