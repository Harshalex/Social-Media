import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "../redux/slices/appConfig";
import postReducer from "../redux/slices/postsSlice";
import feedReducer from "../redux/slices/feedSlice";

export default configureStore({
  reducer: {
    appConfigReducer,
    postReducer,
    feedReducer,
  },
});
