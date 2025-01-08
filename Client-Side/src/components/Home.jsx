import React, { useEffect } from "react";
import { axiosClient } from "../utils/axiosClient";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../redux/slices/appConfig";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("home");
    dispatch(getMyInfo());
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;

// useEffect(() => {
//   async function fetchData() {
//     const data = await axiosClient.get("/all/post");
//     console.log(data);
//   }
//   fetchData();
// }, []);
