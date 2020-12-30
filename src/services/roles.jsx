import { apiGet } from "../api/api";
import {
  getRoleStaffSuccess,
  sendingRequestStaffPending,
  sendingRequestStafftError,
} from "../modules/staffs/staffs.actions";

import { REACT_APP_API_SERVER_ROLES } from "../constants/constants";

export const getRoleStaffsStatus = () => async dispatch => {
  const apiStaffs = REACT_APP_API_SERVER_ROLES;
  dispatch(sendingRequestStaffPending());
  try {
    const respon = await apiGet(apiStaffs);
    const { data } = respon.data;
    await dispatch(getRoleStaffSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(sendingRequestStafftError(error.response.status));
    }
  }
};
