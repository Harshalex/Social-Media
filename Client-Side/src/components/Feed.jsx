import React, { useEffect } from "react";
import Post from "./Post";
import Folllower from "./Folllower";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../redux/slices/feedSlice";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feedReducer.feedData);
  // console.log(feedData);

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);
  return (
    <div>
      <div className="w-4/6 min-h-svh mx-auto flex justify-between">
        <div className=" w-2/3  ">
          {feedData?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className=" w-1/3 mt-6 p-3">
          <p className="pl-4">You are Following</p>
          {feedData?.followings?.map((user) => (
            <Folllower key={user._id} user={user} />
          ))}
          <p className="pl-4 py-2">Suggested for you</p>
          {feedData?.suggestedUsers?.map((user) => (
            <Folllower key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
