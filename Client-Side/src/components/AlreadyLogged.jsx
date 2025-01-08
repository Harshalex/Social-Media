import React from "react";
import { getItem, KET_ACCESS_TOKEN } from "../utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

function AlreadyLogged() {
  const user = getItem(KET_ACCESS_TOKEN);
  return <div>{user ? <Navigate to="/" /> : <Outlet />}</div>;
}

export default AlreadyLogged;
