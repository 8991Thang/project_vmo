import produce from "immer";
const initialState = {
  status: null,
};
export const statusReducers = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case STATUS_SUCCESS:
        draftState.link = null;
        draftState.status = action.payload;
        break;
      case STATUS_ERROR:
        draftState.status = action.error;
        break;
      case SET_LINK_REDIRECT:
        draftState.link = action.payload;
        break;
      case RESET_STATUS:
        draftState.status = null;
        break;
      default:
        return state;
    }
  });
};
export const statusSuccess = status => {
  return {
    type: STATUS_SUCCESS,
    payload: status,
  };
};
export const statusError = error => {
  return {
    type: STATUS_ERROR,
    error,
  };
};
export const resetStatus = () => {
  return {
    type: RESET_STATUS,
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
