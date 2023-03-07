import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="mx-auto flex h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#272D41] via-[#000519] to-[#0e1516] px-0 xs:p-5">
      <div className="z-20 flex w-full max-w-xl flex-col gap-4 bg-white px-4 py-14 xs:rounded-3xl xs:py-24 xs:px-12">
        <div>
          <h1 className="font-nosfier my-10 text-center text-2xl font-bold xs:text-5xl">
            Sign Up
          </h1>
          {error ? (
            <div className="mb-5 border border-red-500 bg-red-500 py-3 text-center text-xl font-bold text-white">
              {error}
            </div>
          ) : null}
          <form className="flex flex-col gap-6">
            <div class="relative z-0">
              <input
                title=""
                type="text"
                value={username}
                onChange={(e) => handleUsername(e)}
                aria-label="Enter username"
                id="username"
                class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 xs:text-base"
                placeholder=" "
                required
              />
              <label
                for="username"
                class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-semibold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 xs:text-base"
              >
                Username
              </label>
            </div>
            <div class="relative z-0">
              <input
                title=""
                type="password"
                value={password}
                onChange={(e) => handlePassword(e)}
                aria-label="Enter password"
                id="password"
                class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 xs:text-base"
                placeholder=" "
                required
              />
              <label
                for="password"
                class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-semibold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 xs:text-base"
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
