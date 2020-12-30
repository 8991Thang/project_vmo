import { apiGet } from "../api/api";
import { REACT_APP_API_SERVER_STAFFS } from "../constants/constants";
import {
  getStaffsSuccess,
  sendingRequestStaffPending,
  sendingRequestStafftError,
} from "../modules/staffs/staffs.actions";
export const getDataStaffsFromApi = limitItems => async dispatch => {
  const apiStaffs = REACT_APP_API_SERVER_STAFFS + "?" + limitItems;
  dispatch(sendingRequestStaffPending());
  try {
    const respon = await apiGet(apiStaffs);
    const { data } = respon.data;
    dispatch(getStaffsSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(sendingRequestStafftError(error.response.status));
    }
  }
};
