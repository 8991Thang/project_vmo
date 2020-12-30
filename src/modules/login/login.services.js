import axios from "axios";
import { REACT_APP_BASE_URL, REACT_APP_LOGIN_SERVER } from "../../constants/constants";
import { getTokenError, getTokenPending, getTokenSuccess } from "./login.reducers";
export const getTokenUserLogin = acountLogin => async dispatch => {
  dispatch(getTokenPending());
  try {
    const serverApiLogin = REACT_APP_LOGIN_SERVER;
    const loginApi = REACT_APP_BASE_URL + serverApiLogin;
    const email = acountLogin.email;
    const password = acountLogin.password;
    const respon = await axios.post(loginApi, { email, password });
    const { accessToken } = respon.data.data.token;
    dispatch(getTokenSuccess({ status: respon.status, token: accessToken }));
  }
  catch (error) {
    dispatch(getTokenError(error.response.status));
  }
};
