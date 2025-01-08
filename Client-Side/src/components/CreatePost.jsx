import React, { useState } from "react";
import Avatar from "./Avatar";

import { HiOutlinePhoto } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import { getUserProfile } from "../redux/slices/postsSlice";
import { useParams } from "react-router-dom";

function CreatePost() {
  const [postImage, setPostImage] = useState("");
  const [caption, setCaption] = useState("");
  const myProfile = useSelector((store) => store.appConfigReducer.myProfile);
  const dispatch = useDispatch();
  const params = useParams();

  function handelImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState == fileReader.DONE) {
        setPostImage(fileReader.result);
      }
    };
  }

  const handelPostSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosClient.post("post/create", {
        caption,
        postImage,
      });
      console.log("Post done", result);
      dispatch(
        getUserProfile({
          userId: params.userId,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setCaption("");
      setPostImage("");
    }
  };

  return (
    <div className="my-6  border-2 flex gap-4 p-5 border-slate-400 rounded-md">
      <div className="mx-2">
        <Avatar src={myProfile?.avatar?.url} />
      </div>
      <div className="w-full">
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          className="w-full px-4 py-2 border-2 border-slate-400 rounded-md"
          placeholder="what's on your mind?"
        />
        {postImage && (
          <img src={postImage} alt="postimg" className="w-full pt-5" />
        )}
        <div className="w-full flex justify-between items-center mt-3">
          <div className="w-fit bg-blue-500 p-3 rounded-full cursor-pointer ">
            <label htmlFor="inputImage">
              <HiOutlinePhoto className="text-3xl text-white cursor-pointer " />
            </label>
            <input
              className="hidden"
              type="file"
              id="inputImage"
              accept="image/*"
              onChange={handelImageChange}
            />
          </div>
          <button
            onClick={handelPostSubmit}
            className="bg-blue-500 text-white px-12 font-semibold rounded-lg py-2 text-lg"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
