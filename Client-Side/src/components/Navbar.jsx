import React, { useRef, useState } from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import { KET_ACCESS_TOKEN, removeItem } from "../utils/localStorage";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((store) => store.appConfigReducer.myProfile);
  // console.log("inside the navbar", myProfile);
  async function handelLogout() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KET_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="border-b-2 border-black h-16">
      <div className="w-4/6 mx-auto flex justify-between mt-4  ">
        <h2
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer hover:text-slate-800 active:text-red-600 "
        >
          Social Media
        </h2>
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate(`/profile/${myProfile._id}`)}
            className="cursor-pointer"
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <AiOutlineLogout
            onClick={handelLogout}
            className="text-3xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
