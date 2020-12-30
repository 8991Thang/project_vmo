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

export const sendingRequestProjectStatusPending = () => {
  return {
    type: CONSTANS.SENDING_REQUEST_PROJECT_STATUS_PENDING,
  };
};
export const sendingRequestProjectStatusSuccess = status => {
  return {
    type: CONSTANS.SENDING_REQUEST_PROJECT_STATUS_SUCCESS,
    payload: status,
  };
};
export const sendingRequestProjectStatusError = error => {
  return {
    type: CONSTANS.SENDING_REQUEST_PROJECT_STATUS_ERROR,
    error,
  };
};
export const detailsProjectStatus = data => {
  return {
    type: CONSTANS.GET_DETAILS_PROJECT_STATUS,
    payload: data,
  };
};

export const createProjectStatusAction = status => {
  return {
    type: CONSTANS.CREATE_PROJECT_STATUS,
    payload: status,
  };
};
export const changePageLimitProjectStatus = page => {
  return {
    type: CONSTANS.CHANGE_PAGE_PROJECT_STATUS,
    payload: page,
  };
};
export const updateProjectStatusSuccess = () => {
  return {
    type: CONSTANS.UPDATE_PROJECT_STATUS,
  };
};
