import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import { REACT_APP_API_SERVER_PROJECT_TYPE } from "../../constants/constants";
import {
  createProjectType,
  getDetailsProjectTypeError,
  getDetailsProjectTypePending,
  getDetailsProjectTypeSucess,
  getProjectTypeError,
  getProjectTypePending,
  getProjectTypeSucess,
  projectTypeUpdate,
  sendingRequestProjectTypeError,
  sendingRequestProjectTypePending,
  sendingRequestProjectTypeSucess,
} from "./project-type.actions";

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

export const creatNewProjectType = newProjectType => async dispatch => {
  const apiProjectType = REACT_APP_API_SERVER_PROJECT_TYPE;
  dispatch(sendingRequestProjectTypePending());
  try {
    const respon = await apiPost(apiProjectType, newProjectType);
    const idNewPost = respon.data.data.recordId;
    await dispatch(createProjectType({ status: respon.status, idNewPost }));
  }
  catch (error) {
    await dispatch(sendingRequestProjectTypeError(error.response.status));
  }
};

export const getDetailsProjectType = id => async dispatch => {
  const apiProjectType = REACT_APP_API_SERVER_PROJECT_TYPE + "/" + id;
  dispatch(getDetailsProjectTypePending());
  try {
    const respon = await apiGet(apiProjectType);
    const { data } = respon.data;
    await dispatch(getDetailsProjectTypeSucess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getDetailsProjectTypeError(error.response.status));
    }
  }
};

export const deleteProjectType = id => async dispatch => {
  const apiProjectType = REACT_APP_API_SERVER_PROJECT_TYPE + "/" + id;
  dispatch(sendingRequestProjectTypePending());
  try {
    const respon = await apiDelete(apiProjectType);
    await dispatch(sendingRequestProjectTypeSucess(respon.status));
  }
  catch (error) {
    await dispatch(sendingRequestProjectTypeError(error.response.status));
  }
};

export const updateProjectType = (id, dataProjectTypes) => async dispatch => {
  const apiProjectType = REACT_APP_API_SERVER_PROJECT_TYPE + "/" + id;
  dispatch(sendingRequestProjectTypePending());
  try {
    const respon = await apiPut(apiProjectType, dataProjectTypes);
    await dispatch(projectTypeUpdate(respon.status));
  }
  catch (error) {
    await dispatch(sendingRequestProjectTypeError(error.response.status));
  }
};
