import { apiGet } from "../api/api";
import { REACT_APP_API_SERVER_TECH_STACK } from "../constants/constants";
import {
  getTechStackError,
  getTechStackPending,
  getTechStackSuccess,
} from "../modules/tech-stack/tech-stack.actions";
export const getListTechStack = limitItems => async dispatch => {
  const apiStaffs = REACT_APP_API_SERVER_TECH_STACK + "?" + limitItems;
  dispatch(getTechStackPending());
  try {
    const respon = await apiGet(apiStaffs);
    const { data } = respon.data;
    await dispatch(getTechStackSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getTechStackError(error.response.status));
    }
  }
};
