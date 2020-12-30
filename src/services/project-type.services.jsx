import { apiGet } from "../api/api";
import { REACT_APP_API_SERVER_PROJECT_TYPE } from "../constants/constants";
import {
  getProjectTypeError,
  getProjectTypePending,
  getProjectTypeSucess,
} from "../modules/project-type/project-type.actions";

export const getDataProjectTypeFromApi = limitItems => async dispatch => {
  const apiProjectType = REACT_APP_API_SERVER_PROJECT_TYPE + "?" + limitItems;
  dispatch(getProjectTypePending());
  try {
    const respon = await apiGet(apiProjectType);
    const { data } = respon.data;
    await dispatch(getProjectTypeSucess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getProjectTypeError(error.response.status));
    }
  }
};
