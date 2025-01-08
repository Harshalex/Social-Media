import React from "react";
import { getItem, KET_ACCESS_TOKEN } from "../utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

function RequiredUser() {
  const user = getItem(KET_ACCESS_TOKEN);
  return <div>{user ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default RequiredUser;
