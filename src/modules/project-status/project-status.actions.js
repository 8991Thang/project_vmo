import * as CONSTANS from "./project-status.constans";

export const getProjectStatusSuccess = data => {
  return {
    type: CONSTANS.GET_PROJECT_STATUS_SUCCESS,
    payload: data,
  };
};
export const getProjectStatusError = error => {
  return {
    type: CONSTANS.GET_PROJECT_STATUS_ERROR,
    error,
  };
};

export const getProjectStatusPending = () => {
  return {
    type: CONSTANS.GET_PROJECT_STATUS_PENDING,
  };
};

export const changePageLimitProjectStatus = page => {
  return {
    type: CONSTANS.CHANGE_PAGE_PROJECT_STATUS,
    payload: page,
  };
};
