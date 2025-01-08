import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import RequiredUser from "./components/RequiredUser";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";
import AlreadyLogged from "./components/AlreadyLogged";
import store from "./redux/store";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILED = "toast_failed";

function App() {
  const isLoading = useSelector((store) => store.appConfigReducer.isLoading);
  const loadingRef = useRef(null);
  const toastData = useSelector((store) => store.appConfigReducer.toastData);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILED:
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);
  return (
    <>
      <LoadingBar color="#f11946" ref={loadingRef} shadow={true} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequiredUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Route>
        <Route element={<AlreadyLogged />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/updateprofile" element={<UpdateProfile />} />
      </Routes>
    </>
  );
}

export default App;
