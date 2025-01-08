import React, { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    const result = await axiosClient.post("/auth/signup", {
      email,
      password,
      name,
    });
    console.log(result);
    navigate("/login");
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-svh">
        <div className="w-1/4  border-2 border-slate-500 p-5 px-3 rounded-lg ">
          <h1 className="text-3xl text-center py-3 font-bold text-slate-600">
            Sign Up
          </h1>
          <form onSubmit={(e) => handelSubmit(e)}>
            <label
              className="block py-3 px-4 text-xl font-semibold text-slate-700"
              htmlFor="name"
            >
              Enter your Name :{" "}
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block py-2 w-full px-4 border-2 border-slate-500 rounded-lg"
              type="text"
              placeholder="Name"
            />

            <label
              className="block py-3 px-4 text-xl font-semibold text-slate-700"
              htmlFor="email"
            >
              Enter your Email :{" "}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2 px-4 w-full border-2 border-slate-500 rounded-lg"
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
              className="block py-2 px-4 w-full border-2 border-slate-500 rounded-lg"
              type="password"
              placeholder="Password"
            />
            <div className="text-center w-full flex justify-center mx-3 my-4">
              <button
                onClick={handelSubmit}
                className=" text-white rounded-xl block py-2 px-4 bg-blue-500 hover:bg-blue-700"
              >
                Signup
              </button>
            </div>
            <p className="px-4 pb-4">
              Already have an account?{" "}
              <span>
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-500 font-semibold"
                >
                  login here
                </button>
              </span>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
