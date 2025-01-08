import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getFollowAndUnfollow } from "../redux/slices/feedSlice";

function Folllower({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feedReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    if (feedData.followings.find((item) => item._id == user._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [feedData]);

  function handelFollow() {
    dispatch(
      getFollowAndUnfollow({
        userIdToFollow: user._id,
      })
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div
        className="flex p-3 items-center py-3 gap-3 cursor-pointer"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <Avatar src={user?.avatar?.url} />
        <p className="font-serif ">{user?.name}</p>
      </div>
      {isFollowing ? (
        <p
          onClick={handelFollow}
          className="text-blue-600 border-2 border-blue-400 px-3 cursor-pointer py-1 rounded-lg
        hover:border-blue-800 active:text-blue-900 active:bg-blue-400 "
        >
          Unfollow
        </p>
      ) : (
        <p
          onClick={handelFollow}
          className="text-white bg-blue-500 border-2 border-blue-400 px-3 cursor-pointer py-1 rounded-lg
      hover:border-blue-800 active:text-blue-900 active:bg-blue-400 "
        >
          Follow
        </p>
      )}
    </div>
  );
}

export default Folllower;
