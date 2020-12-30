import { apiGet } from "../api/api";
import { REACT_APP_API_SERVER_PROJECT_STATUS } from "../constants/constants";
import {
  getProjectStatusError,
  getProjectStatusPending,
  getProjectStatusSuccess,
} from "../modules/project-status/project-status.actions";

export const getListProjectStatus = limitItems => async dispatch => {
  const apiProjectStatus = REACT_APP_API_SERVER_PROJECT_STATUS + "?" + limitItems;
  dispatch(getProjectStatusPending());
  try {
    const respon = await apiGet(apiProjectStatus);
    const { data } = respon.data;
    await dispatch(getProjectStatusSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getProjectStatusError(error.response.status));
    }
  }
};
