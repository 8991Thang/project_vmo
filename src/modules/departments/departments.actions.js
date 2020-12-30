import {
  CHANGE_NUMBER_PAGE,
  CREATE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_SUCCESS,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENT_DETAILS_SUCCESS,
  SENDING_REQUEST_DEPARTMENT_ERROR,
  SENDING_REQUEST_DEPARTMENT_PENDING,
  UPDATE_DEPARTMENT_SUCCESS,
} from "./departments.constants";

export const getDepartmentsSuccess = data => {
  return {
    type: GET_DEPARTMENTS_SUCCESS,
    payload: data,
  };
};

export const changeNumberPage = data => {
  return {
    type: CHANGE_NUMBER_PAGE,
    payload: data,
  };
};

export const sendingRequestDepartmentPending = () => {
  return {
    type: SENDING_REQUEST_DEPARTMENT_PENDING,
  };
};

export const sendingRequestDepartmentError = error => {
  return {
    type: SENDING_REQUEST_DEPARTMENT_ERROR,
    error,
  };
};

export const sendingDeleteDepartmentSuccess = status => {
  return {
    type: DELETE_DEPARTMENT_SUCCESS,
    payload: status,
  };
};

export const getDepartmentDetailsSuccess = data => {
  return {
    type: GET_DEPARTMENT_DETAILS_SUCCESS,
    payload: data,
  };
};

export const createDepartmentSuccess = data => {
  return {
    type: CREATE_DEPARTMENT_SUCCESS,
    payload: data,
  };
};

export const sendingUpdateDepartmentSuccess = data => {
  return {
    type: UPDATE_DEPARTMENT_SUCCESS,
    payload: data,
  };
};


