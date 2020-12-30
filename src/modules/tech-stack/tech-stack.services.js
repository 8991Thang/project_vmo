import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import { REACT_APP_API_SERVER_TECH_STACK } from "../../constants/constants";
import {
  createTechStackSucess,
  deleteTechStackSucess,
  getDetailsTechStackSucess,
  getTechStackError,
  getTechStackPending,
  getTechStackSuccess,
  updateTechStackSucess,
} from "./tech-stack.actions";
export const getListTechStack = limitItems => async dispatch => {
  const apiTechStack = REACT_APP_API_SERVER_TECH_STACK + "?" + limitItems;
  dispatch(getTechStackPending());
  try {
    const respon = await apiGet(apiTechStack);
    const { data } = respon.data;
    await dispatch(getTechStackSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getTechStackError(error.response.status));
    }
  }
};

export const getDetailsTechStack = id => async dispatch => {
  const apiTechStack = REACT_APP_API_SERVER_TECH_STACK + "/" + id;
  dispatch(getTechStackPending());
  try {
    const respon = await apiGet(apiTechStack);
    const { data } = respon.data;
    await dispatch(getDetailsTechStackSucess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getTechStackError(error.response.status));
    }
  }
};

export const deleteTechStack = id => async dispatch => {
  const apiTechStack = REACT_APP_API_SERVER_TECH_STACK + "/" + id;
  dispatch(getTechStackPending());
  try {
    const respon = await apiDelete(apiTechStack);
    await dispatch(deleteTechStackSucess(respon.status));
  }
  catch (error) {
    await dispatch(getTechStackError(error.response.status));
  }
};

export const updateTechStack = (id, dataTechStack) => async dispatch => {
  const apiTechStack = REACT_APP_API_SERVER_TECH_STACK + "/" + id;
  dispatch(getTechStackPending());
  try {
    const respon = await apiPut(apiTechStack, dataTechStack);
    await dispatch(updateTechStackSucess(respon.status));
  }
  catch (error) {
    await dispatch(getTechStackError(error.response.status));
  }
};

export const creatTechStack = dataNewTechStack => async dispatch => {
  const apiTechStack = REACT_APP_API_SERVER_TECH_STACK;
  dispatch(getTechStackPending());
  try {
    const respon = await apiPost(apiTechStack, dataNewTechStack);
    const idNewPost = respon.data.data.recordId;
    await dispatch(createTechStackSucess({ status: respon.status, idNewPost }));
  }
  catch (error) {
    await dispatch(getTechStackError(error.response.status));
  }
};
