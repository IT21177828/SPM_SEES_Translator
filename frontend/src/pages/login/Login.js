import React, { useState } from "react";
import axios from "axios";
import Jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const refreashToken = async () => {
    try {
      const response = await axios.post("http://localhost:5050/user/refresh", {
        token: user.refreashToken,
      });

      console.log(response);

      setUser({
        ...user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = Jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreashToken();
        config.headers["authorization"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("submit");
    try {
      const response = await axios
        .post("http://localhost:5050/user/login", {
          email,
          passwordHash,
        })
        .then((res) => {
          // console.log(res.data.user.firstName);
          const newUser = { user: res.data.user };
          console.log(newUser);
          setUser(newUser);

          if (user) {
            console.log(user);
            setsuccess(true);
            seterror(false);
          }
          console.log(res.data)
          const {accessToken, refreshToken} = { ...res.data };
          console.log(accessToken)
          console.log(refreshToken)
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          navigate("/");
        });
    } catch (error) {
      seterror("Invalid email or password");
      console.log(error);
    }
  };

  return (
    <div>
      {!user ? (
        <div className="bg-slate-100 w-96 rounded-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex min-h-92 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Log in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) => setPasswordHash(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                  {error && <div className="error">{error}</div>}
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <a
                  href=""
                  className="font-semibold pl-2 leading-6 text-indigo-600 hover:text-indigo-500"
                  onClick={() => navigate("/register")}
                >
                  Register here
                </a>
              </p>
            </div>
            <span className="text-red-600">{error}</span>
          </div>
        </div>
      ) : (
        <div className="bg-slate-100 w-96 h-60 rounded-md">
          <span className="text-red-500">{user.gender}</span> <br />
          <span>{user && user.lastName}</span> <br />
          <span>{user && user.email}</span> <br />
        </div>
      )}
    </div>
  );
}
