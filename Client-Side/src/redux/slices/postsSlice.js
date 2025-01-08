import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfig";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/getuserprofile", body);
      //   console.log("The result u got is ", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const likeAndUnlike = createAsyncThunk(
  "post/likeAndUnlike",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/post/like", body);
      // console.log("The result u got is ", response);
      return response.result.post;
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    userProfile: {}, // This is the correct place for userProfile
  },
  reducers: {
    // Add any sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likeAndUnlike.fulfilled, (state, action) => {
        const post = action.payload;
        // console.log(state.userProfile.posts);
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id == post._id
        );
        console.log(index);
        if (index != undefined && index != -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});

export default postsSlice.reducer;

// state.userProfile.posts = [
//   ...state.userProfile.posts.slice(0, index),
//   post,
//   ...state.userProfile.posts.slice(index + 1),
// ];
