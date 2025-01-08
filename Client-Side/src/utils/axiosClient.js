import axios from "axios";
import { getItem, KET_ACCESS_TOKEN, removeItem, setItem } from "./localStorage";
import store from "../redux/store";
import { setLoading, showToast } from "../redux/slices/appConfig";
import { TOAST_FAILED } from "../App";

// baseURL:
const url = import.meta.env.VITE_SERVER_BASE_URL;
console.log(url);
export const axiosClient = axios.create({
  baseURL: url || "http://localhost:4000",
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  console.log("We are in side axios request");
  const accessToken = getItem(KET_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  store.dispatch(setLoading(true));
  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    store.dispatch(setLoading(false));
    const data = response.data;
    if (data.status === "ok") {
      return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(
      showToast({
        type: TOAST_FAILED,
        message: error,
      })
    );
    //

    // if (
    //   statusCode === 401 &&
    //   originalRequest.url === "http://localhost:4000/auth/refresh"
    // ) {
    //   removeItem(KET_ACCESS_TOKEN);
    //   window.location.replace("/login", "_self");
    //   return Promise.reject(error);
    // }

    if (statusCode == 401) {
      console.log("Refresh api is called");
      const response = await axios.get("/auth/refresh");
      if (response.status === "ok") {
        setItem(KET_ACCESS_TOKEN, response.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.result.accessToken}`;
        return axios(originalRequest);
      } else {
        removeItem(KET_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(false));
    store.dispatch(
      showToast({
        type: TOAST_FAILED,
        message: error.message,
      })
    );
    return Promise.reject(error);
  }
);
