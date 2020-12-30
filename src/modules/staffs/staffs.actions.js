import {
  CHANGE_NUMBER_PAGE,
  CREATE_STAFF_SUCCESS,
  GET_STAFFS_SUCCESS,
  GET_STAFF_DETAIL_SUCCESS,
  SENDING_REQUEST_STAFF_ERROR,
  SENDING_REQUEST_STAFF_PENDING,
  SENDING_REQUEST_STAFF_SUCCESS,
  STAFF_ROLES_SUCCESS,
} from "./staffs.constants";

export const getStaffsSuccess = data => {
  return {
    type: GET_STAFFS_SUCCESS,
    payload: data,
  };
};

export const changeNumberPage = data => {
  return {
    type: CHANGE_NUMBER_PAGE,
    payload: data,
  };
};

export const sendingRequestStaffPending = () => {
  return {
    type: SENDING_REQUEST_STAFF_PENDING,
  };
};

export const sendingRequestStafftError = error => {
  return {
    type: SENDING_REQUEST_STAFF_ERROR,
    error,
  };
};

export const sendingRequestStaffSuccess = status => {
  return {
    type: SENDING_REQUEST_STAFF_SUCCESS,
    payload: status,
  };
};

export const getStaffDetailSuccess = data => {
  return {
    type: GET_STAFF_DETAIL_SUCCESS,
    payload: data,
  };
};

export const getRoleStaffSuccess = data => {
  return {
    type: STAFF_ROLES_SUCCESS,
    payload: data,
  };
};

export const createStaffSuccess = data => {
  return {
    type: CREATE_STAFF_SUCCESS,
    payload: data,
  };
};
