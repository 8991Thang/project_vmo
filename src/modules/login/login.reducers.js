import produce from "immer";
import { GET_TOKEN_ERROR, GET_TOKEN_PENDING, GET_TOKEN_SUCCESS } from "./login.constans";
const initialState = {
  loading: false,
  status: null,
};
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_PENDING:
      return produce(state, draftState => {
        draftState.status = null;
        draftState.loading = true;
      });
    case GET_TOKEN_SUCCESS:
      return produce(state, draftState => {
        draftState.loading = false;
        if (action.payload === undefined) {
          draftState.status = action.payload;
          return;
        }
        draftState.status = action.payload.status;
        localStorage.setItem("token", action.payload.token);
      });
    case GET_TOKEN_ERROR:
      return produce(state, draftState => {
        draftState.loading = false;
        draftState.status = action.error;
      });
    default:
      return state;
  }
};

export const getTokenPending = () => {
  return {
    type: GET_TOKEN_PENDING,
  };
};
export const getTokenSuccess = token => {
  return {
    type: GET_TOKEN_SUCCESS,
    payload: token,
  };
};
export const getTokenError = error => {
  return {
    type: GET_TOKEN_ERROR,
    error,
  };
};
