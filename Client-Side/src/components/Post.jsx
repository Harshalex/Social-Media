import React from "react";
import Avatar from "./Avatar";
import { IoHeartSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { likeAndUnlike } from "../redux/slices/postsSlice";
import cat2 from "../assets/cat2.jpg";
import { showToast } from "../redux/slices/appConfig";
import { TOAST_SUCCESS } from "../App";

function Post({ post }) {
  const navigate = useNavigate();
  // console.log(post.avatar);
  const avatar = post?.owner?.avatar?.url;
  const dispatch = useDispatch();
  function handelLikeUnlike() {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "Liked and Unliked",
      })
    );

    dispatch(
      likeAndUnlike({
        postId: post._id,
      })
    );
  }
  return (
    <div className="my-6 border-2 border-slate-400 rounded-md  ">
      <div>
        <div
          className="flex gap-5 items-center pl-6 pt-2 cursor-pointer "
          onClick={() => navigate(`/profile/${post?.owner?._id}`)}
        >
          {avatar ? <Avatar src={post?.owner?.avatar?.url} /> : <Avatar />}

          <p className="font-mono font-semibold">{post?.owner?.name}</p>
        </div>
      </div>
      <div className="mt-3">
        <img src={post?.image?.url} alt="cat" className="w-full h-96 " />
      </div>
      <div
        className="flex mt-3 pl-6 gap-3 cursor-pointer"
        onClick={handelLikeUnlike}
      >
        {post.isLiked ? (
          <IoHeartSharp className="text-2xl text-red-600 " />
        ) : (
          <IoHeartOutline className="text-2xl " />
        )}

        <p className=" font-semibold">{post?.likesCount} likes</p>
      </div>
      <p className=" pl-6 mt-2 font-medium text-slate-800">{post?.caption}</p>
      <p className="pl-6 mt-2 font-medium text-slate-600 pb-4">
        {post?.timeago}
      </p>
    </div>
  );
}

export default Post;

{
  /* <div className="my-6 border-2 border-slate-400 rounded-md  ">
      <div>
        <div className="flex gap-5 items-center pl-6 pt-2 ">
          <Avatar />
          <p className="font-mono font-semibold">Alex Blaze</p>
        </div>
      </div>
      <div className="mt-3">
        <img src={cat2} alt="cat" />
      </div>
      <div
        className="flex mt-3 pl-6 gap-3 cursor-pointer"
        onClick={handelLikeUnlike}
      ></div> */
}
{
  /* {post.isLiked ? (
          <IoHeartSharp className="text-2xl text-red-600 " />
        ) : (
          <IoHeartOutline className="text-2xl " />
        )} */
}
//     <IoHeartOutline className="text-2xl " />

//     <p className=" font-semibold">4 likes</p>
//   </div>
//   <p className=" pl-6 mt-2 font-medium text-slate-800">My caption</p>
//   <p className="pl-6 mt-2 font-medium text-slate-600 pb-4">4 days ago</p>
// </div>
