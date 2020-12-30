import * as CONSTANS from "./project-type.constants";

export const getProjectTypePending = () => {
  return {
    type: CONSTANS.GET_PROJECT_TYPE_PENDING,
  };
};
export const getProjectTypeSucess = data => {
  return {
    type: CONSTANS.GET_PROJECT_TYPE_SUCCESS,
    payload: data,
  };
};
export const getProjectTypeError = error => {
  return {
    type: CONSTANS.GET_PROJECT_TYPE_ERROR,
    error,
  };
};
export const getDetailsProjectTypePending = () => {
  return {
    type: CONSTANS.GET_DETAILS_PROJECT_TYPE_PENDING,
  };
};
export const getDetailsProjectTypeSucess = data => {
  return {
    type: CONSTANS.GET_DETAILS_PROJECT_TYPE_SUCCESS,
    payload: data,
  };
};
export const getDetailsProjectTypeError = error => {
  return {
    type: CONSTANS.GET_DETAILS_PROJECT_TYPE_ERROR,
    error,
  };
};

export const sendingRequestProjectTypePending = () => {
  return {
    type: CONSTANS.SENDING_REQUEST_PROJECT_TYPE_PENDING,
  };
};
export const sendingRequestProjectTypeSucess = status => {
  return {
    type: CONSTANS.SENDING_REQUEST_PROJECT_TYPE_SUCCESS,
    payload: status,
  };
};

export const sendingRequestProjectTypeError = error => {
  return {
    type: CONSTANS.SENDING_REQUEST_PROJECT_TYPE_ERROR,
    error,
  };
};
export const projectTypeUpdate = status => {
  return {
    type: CONSTANS.UPDATE_PROJECT_TYPE,
    payload: status,
  };
};

export const changePageLimitProjectType = pageChange => {
  return {
    type: CONSTANS.CHANGE_PAGE_PROJECT_TYPE,
    payload: pageChange,
  };
};

export const createProjectType = status => {
  return {
    type: CONSTANS.CREATE_PROJECT_TYPE,
    payload: status,
  };
};
