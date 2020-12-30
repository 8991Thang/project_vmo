import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import {
  createStaffSuccess,
  getStaffDetailSuccess,
  sendingRequestStaffPending,
  sendingRequestStaffSuccess,
  sendingRequestStafftError,
} from "./staffs.actions";

import { REACT_APP_API_SERVER_STAFFS } from "../../constants/constants";

export const createNewStaffFromApi = data => async dispatch => {
  const apiCustomer = REACT_APP_API_SERVER_STAFFS;
  dispatch(sendingRequestStaffPending());
  try {
    const respon = await apiPost(apiCustomer, data);
    const idNewPost = respon.data.data.recordId;
    await dispatch(createStaffSuccess({ status: respon.status, idNewPost }));
  }
  catch (error) {
    await dispatch(sendingRequestStafftError(error.response.status));
  }
};

export const getStaffsDetailsFromApi = id => async dispatch => {
  const apiStaffs = REACT_APP_API_SERVER_STAFFS + "/" + id;
  dispatch(sendingRequestStaffPending());
  try {
    const respon = await apiGet(apiStaffs);
    const { data } = respon.data;
    await dispatch(getStaffDetailSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(sendingRequestStafftError(error.response.status));
    }
  }
};

export const deleteStaff = id => async dispatch => {
  const apiStaff = REACT_APP_API_SERVER_STAFFS + "/" + id;
  dispatch(sendingRequestStaffPending());
  try {
    const respon = await apiDelete(apiStaff);
    await dispatch(sendingRequestStaffSuccess(respon.status));
  }
  catch (error) {
    await dispatch(sendingRequestStafftError(error.response.status));
  }
};


export const updateStaff = (dataStaff, id, setUpdate) => async dispatch => {
  const apiUpdateStaff = REACT_APP_API_SERVER_STAFFS + "/" + id;
  dispatch(sendingRequestStaffPending());
  try {
    const respon = await apiPut(apiUpdateStaff, dataStaff);
    await dispatch(sendingRequestStaffSuccess(respon.status));
    setUpdate(false);
  }
  catch (error) {
    await dispatch(sendingRequestStafftError(error.response.status));
  }
};
