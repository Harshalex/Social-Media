import React, { useEffect, useState } from "react";
import userimg from "../assets/cat2.jpg";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./Navbar";
import { updateMyProfile } from "../redux/slices/appConfig";
import { axiosClient } from "../utils/axiosClient";
import { removeItem } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const dispatch = useDispatch();
  const myProfile = useSelector((store) => store.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setImage(myProfile?.avatar?.url || null);
  }, []);

  function handelImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState == fileReader.DONE) {
        setImage(fileReader.result);
      }
    };
  }

  function handelSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        image,
      })
    );
  }

  async function handelRemoveUser() {
    try {
      await axiosClient.delete("/user/deleteuser");
      removeItem(KET_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <div className="w-4/6 mx-auto flex gap-6 mt-6 items-center">
          <div className="flex gap-6 justify-center">
            <label
              className="w-fit cursor-pointer p-2 border-2 rounded-full border-blue-700 border-dashed "
              htmlFor="userImg"
            >
              <img
                src={image}
                alt="cat"
                className="h-48 w-fit rounded-full object-cover"
              />
            </label>
            <input
              className="hidden"
              type="file"
              id="userImg"
              accept="image/*"
              onChange={handelImageChange}
            />
            {/*  */}
          </div>
          <div className="flex flex-col">
            <div className=" border-2 border-slate-400 rounded-md">
              <form
                onSubmit={handelSubmit}
                className="flex flex-col m-4 items-start p-6 gap-4"
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-96 border-2 border-slate-400 rounded-md px-4 py-1"
                  type="text"
                  placeholder="Your Name"
                />
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-96 border-2 border-slate-400 rounded-md px-4 py-1"
                  type="text"
                  placeholder="Your Bio"
                />
                <input
                  onClick={handelSubmit}
                  className="bg-blue-400 text-white cursor-pointer font-semibold px-5 py-2 rounded-lg"
                  type="button"
                  value="Update"
                />
              </form>
            </div>
            <input
              onClick={handelRemoveUser}
              className="bg-red-500 ml-4 w-48 mt-4 text-white cursor-pointer font-bold px-12 py-2 rounded-lg"
              type="button"
              value="Delete Account"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
