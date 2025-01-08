import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KET_ACCESS_TOKEN, setItem } from "../../utils/localStorage";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handelSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    const result = await axiosClient.post("/auth/login", { email, password });
    console.log(result.result.accessToken);
    setItem(KET_ACCESS_TOKEN, result.result.accessToken);
    navigate("/");
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-svh">
        <div className="w-1/4  rounded-lg  border-2 border-slate-500 p-5">
          <h1 className="text-3xl text-center py-3 font-bold text-slate-600 pt-3">
            Login
          </h1>
          <form>
            <label
              className="block py-3 px-4 text-xl font-semibold text-slate-700"
              htmlFor="email"
            >
              Enter your Email :{" "}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2 px-3 rounded-lg  w-full border-2 border-slate-500"
              type="text"
              placeholder="Email"
            />

            <label
              className="block py-3 px-4 text-xl font-semibold text-slate-700"
              htmlFor="password"
            >
              Enter your Password :{" "}
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full py-2 px-4  rounded-lg border-2 border-slate-500"
              type="password"
              placeholder="Password"
            />
            <div className="text-center w-full flex justify-center mx-3 my-4">
              <button
                onClick={handelSubmit}
                className=" text-white rounded-xl block py-2 px-4 bg-blue-500 hover:bg-blue-700"
              >
                Login
              </button>
            </div>
            <p className="px-4 pb-4">
              Do not have an account?{" "}
              <span>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-500 font-semibold"
                >
                  Sign up
                </button>
              </span>{" "}
            </p>
          </form>
        </div>
      </div>
      ;
    </>
  );
}

export default Login;
