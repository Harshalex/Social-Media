import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/slices/postsSlice";
import CreatePost from "./CreatePost";
import { getFollowAndUnfollow } from "../redux/slices/feedSlice";

function Profile() {
  const navigate = useNavigate();
  const myProfile = useSelector((store) => store.appConfigReducer.myProfile);
  const userProfile = useSelector((store) => store.postReducer.userProfile);
  const feedData = useSelector((store) => store.feedReducer.feedData);
  const [isMyProfile, setIsMyProflie] = useState(false);
  const [isFollowing, setIsFollowing] = useState();

  // console.log("The data of user we got", userProfile);
  const params = useParams();
  const dispatch = useDispatch();
  const avatar = userProfile?.avatar?.url;
  // console.log(userProfile.avatar.url);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProflie(myProfile?._id == params.userId);
    setIsFollowing(true);

    setIsFollowing(
      feedData?.followings?.find((item) => item._id == params.userId)
    );
    console.log(isFollowing);
  }, [myProfile, params.userId, feedData]);

  function handelFollow() {
    dispatch(
      getFollowAndUnfollow({
        userIdToFollow: params.userId,
      })
    );
    console.log(isFollowing);
  }

  return (
    <div>
      <div className="w-4/6 min-h-svh mx-auto flex justify-between gap-3">
        <div className=" w-2/3 ">
          {isMyProfile && <CreatePost />}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} avatar={avatar} />
          ))}
        </div>
        <div className=" w-1/3 h-fit mt-6 p-3 border-2 border-slate-400 rounded-md">
          <div className="flex flex-col justify-center items-center gap-2 py-3">
            <img
              className="h-32 rounded-full"
              src={userProfile?.avatar?.url}
              alt="user"
            />
            <p className="text-lg font-normal">{userProfile?.name}</p>
            <p className="text-sm font-semibold">{userProfile?.bio}</p>
          </div>
          <div className="flex justify-center gap-20">
            <div className="text-center">
              <p className="font-semibold">{userProfile?.followers?.length}</p>
              <p className="font-bold">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{userProfile?.followings?.length}</p>
              <p className="font-bold">Following</p>
            </div>
          </div>
          {/* {!isMyProfile && (
            <p className="mx-auto mt-4 px-10 py-2 bg-blue-600 w-fit rounded-lg text-white cursor-pointer hover:border-blue-800 active:text-blue-900 active:bg-blue-400 ">
              Follow
            </p>
          )} */}
          {!isMyProfile && (
            <p
              onClick={handelFollow}
              className={`mx-auto mt-4 px-10 py-2 ${
                isFollowing
                  ? "bg-white text-blue-600 border-2 border-blue-600"
                  : "bg-blue-600 text-white"
              }  w-fit rounded-lg  cursor-pointer hover:border-blue-800 active:text-blue-900 active:bg-blue-400`}
            >
              {isFollowing ? <span>Unfollow</span> : <span>Follow</span>}
            </p>
          )}
          {isMyProfile && (
            <p
              onClick={() => navigate("/updateprofile")}
              className="mx-auto mt-4 px-10 py-2 w-fit rounded-lg cursor-pointer text-blue-600 border-2 border-blue-400 hover:border-blue-800 active:text-blue-900 active:bg-blue-400 "
            >
              Update Profile
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
