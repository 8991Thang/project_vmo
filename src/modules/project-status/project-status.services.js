import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import { REACT_APP_API_SERVER_PROJECT_STATUS } from "../../constants/constants";
import {
  createProjectStatusAction,
  detailsProjectStatus,
  getProjectStatusError,
  getProjectStatusPending,
  getProjectStatusSuccess,
  sendingRequestProjectStatusError,
  sendingRequestProjectStatusPending,
  sendingRequestProjectStatusSuccess,
  updateProjectStatusSuccess,
} from "./project-status.actions";

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

export const createProjectStatus = dataProjectStatus => async dispatch => {
  const apiProjectStatus = REACT_APP_API_SERVER_PROJECT_STATUS;
  dispatch(sendingRequestProjectStatusPending());
  try {
    const respon = await apiPost(apiProjectStatus, dataProjectStatus);
    const idNewPost = respon.data.data.recordId;
    await dispatch(createProjectStatusAction({ status: respon.status, idNewPost }));
  }
  catch (error) {
    await dispatch(sendingRequestProjectStatusError(error.response.status));
  }
};

export const getDetailsProjectStatus = id => async dispatch => {
  const apiProjectStatus = REACT_APP_API_SERVER_PROJECT_STATUS + "/" + id;
  dispatch(getProjectStatusPending());
  try {
    const respon = await apiGet(apiProjectStatus);
    const { data } = respon.data;
    await dispatch(detailsProjectStatus(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(sendingRequestProjectStatusError(error.response.status));
    }
  }
};

export const deleteProjectStatus = id => async dispatch => {
  const apiProjectStatus = REACT_APP_API_SERVER_PROJECT_STATUS + "/" + id;
  dispatch(sendingRequestProjectStatusPending());
  try {
    const respon = await apiDelete(apiProjectStatus);
    await dispatch(sendingRequestProjectStatusSuccess(respon.status));
  }
  catch (error) {
    await dispatch(sendingRequestProjectStatusError(error.response.status));
  }
};

export const updateProjectStatus = (id, dataProjectStatus) => async dispatch => {
  const apiProjectStatus = REACT_APP_API_SERVER_PROJECT_STATUS + "/" + id;
  dispatch(sendingRequestProjectStatusPending());
  try {
    const respon = await apiPut(apiProjectStatus, dataProjectStatus);
    await dispatch(updateProjectStatusSuccess(respon.status));
  }
  catch (error) {
    await dispatch(sendingRequestProjectStatusError(error.response.status));
  }
};
