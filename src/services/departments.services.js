import { apiGet } from "../api/api";
import { REACT_APP_API_SERVER_DEPARTMENTS } from "../constants/constants";
import {
  getDepartmentsSuccess,
  sendingRequestDepartmentError,
  sendingRequestDepartmentPending,
} from "../modules/departments/departments.actions";

export const getDataDepartmentsFromApi = limitItems => async dispatch => {
  const apiDepartments = REACT_APP_API_SERVER_DEPARTMENTS + "?" + limitItems;
  dispatch(sendingRequestDepartmentPending());
  try {
    const respon = await apiGet(apiDepartments);
    const { data } = respon.data;
    await dispatch(getDepartmentsSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(sendingRequestDepartmentError(error.response.status));
    }
  }
};
