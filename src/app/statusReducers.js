import produce from "immer";
const initialState = {
  status: null,
  link: null,
};
export const statusReducers = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_SUCCESS:
      return produce(state, draftState => {
        draftState.link = null;
        draftState.status = action.payload;
      });
    case STATUS_ERROR:
      return produce(state, draftState => {
        draftState.status = action.error;
      });
    case SET_LINK_REDIRECT:
      return produce(state, draftState => {
        draftState.link = action.payload;
      });
    case RESET_STATUS:
      return produce(state, draftState => {
        draftState.status = null;
      });
    default:
      return state;
  }
};
export const statusSuccess = status => {
  return {
    type: "STATUS_SUCCESS",
    payload: status,
  };
};
export const statusError = error => {
  return {
    type: "STATUS_ERROR",
    error,
  };
};
export const resetStatus = () => {
  return {
    type: "RESET_STATUS",
  };
};

export const setLinkRedirect = link => {
  return {
    type: "SET_LINK_REDIRECT",
    payload: link,
  };
};

const STATUS_SUCCESS = "STATUS_SUCCESS";

const STATUS_ERROR = "STATUS_ERROR";

const SET_LINK_REDIRECT = "SET_LINK_REDIRECT";

const RESET_STATUS = "RESET_STATUS";
