import { apiGet } from "../api/api";
import { REACT_APP_API_SERVER_PROJECTS } from "../constants/constants";
import {
  getDataProjectsSuccess,
  requestProjectsError,
  requestProjectsPending,
} from "../modules/projects/projects.actions";

export const getDataProjects = limitItems => async dispatch => {
  const apiStaffs = REACT_APP_API_SERVER_PROJECTS + "?" + limitItems;
  dispatch(requestProjectsPending());
  try {
    const respon = await apiGet(apiStaffs);
    const { data } = respon.data;
    await dispatch(getDataProjectsSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(requestProjectsError(error.response.status));
    }
  }
};
