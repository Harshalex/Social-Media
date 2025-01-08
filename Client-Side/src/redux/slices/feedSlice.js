import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfig";
import { likeAndUnlike } from "./postsSlice";
import { useDispatch } from "react-redux";

export const getFeedData = createAsyncThunk(
  "user/getFeedData",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getfeed");
      //   console.log("The result u got is ", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getFollowAndUnfollow = createAsyncThunk(
  "user/getFollowAndUnfollow",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/followorunfollow", body);
      console.log("The result u got is ", response);
      return response.result.userToFollow;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {}, // This is the correct place for userProfile
  },
  reducers: {
    // Add any sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlike.fulfilled, (state, action) => {
        const post = action.payload;
        console.log(state.feedData.posts);
        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id == post._id
        );
        console.log(index);
        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(getFollowAndUnfollow.fulfilled, (state, action) => {
        const user = action.payload;
        console.log(user);
        const index = state?.feedData?.followings?.findIndex(
          (item) => item._id == user?._id
        );
        if (index != -1) {
          state?.feedData?.followings?.splice(index, 1);
          // state.feedData.followings = [
          //   ...state.feedData.followings.slice(0, index),
          //   ...state.feedData.followings.slice(index + 1),
          // ];
        } else {
          state?.feedData?.followings?.push(user);
          // state.feedData.followings = [...state.feedData.followings, user];
        }
      });
  },
});

export default feedSlice.reducer;

// state.userProfile.posts = [
//   ...state.userProfile.posts.slice(0, index),
//   post,
//   ...state.userProfile.posts.slice(index + 1),
// ];
