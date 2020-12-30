import Axios from "axios";
import { resetStatus, statusError, statusSuccess } from "../app/statusReducers";
import { store } from "../app/store";
// import { Alert } from "react-st-modal";
import { REACT_APP_BASE_URL } from "../constants/constants";
import { getDataFromLocalStorage } from "../utils/get-data-from-local-storge";
const axiosInstance = Axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getDataFromLocalStorage("token");
    if (token) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
      });
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  async function (response) {
    store.dispatch(resetStatus(null));
    if (response.config.method === "get") return response;
    store.dispatch(statusSuccess(response.status));
    return response;
  },
  function (error) {
    store.dispatch(resetStatus(null));
    store.dispatch(statusError(error.response.status));
    return Promise.reject(error);
  },
);
export default axiosInstance;
