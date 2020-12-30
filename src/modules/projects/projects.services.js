import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import { getCustomers } from "../../services/customers.services";
import { getDataDepartmentsFromApi } from "../../services/departments.services";
import { getListProjectStatus } from "../../services/project-status";
import { getDataProjectTypeFromApi } from "../../services/project-type.services";
import { REACT_APP_API_SERVER_PROJECTS } from "../../constants/constants";
import { getDataStaffsFromApi } from "../../services/staffs.services";
import { getListTechStack } from "../../services/tech-stack.services";
import {
  createProjectsSuccess,
  deleteProjectsSuccess,
  getDetailsProjectsSuccess,
  requestProjectsError,
  requestProjectsPending,
  updateProjectsSuccess,
} from "./projects.actions";

export const getDetailsProjects = id => async dispatch => {
  const apiProjects = REACT_APP_API_SERVER_PROJECTS + "/" + id;
  dispatch(requestProjectsPending());
  try {
    const respon = await apiGet(apiProjects);
    const { data } = respon.data;
    await dispatch(getDetailsProjectsSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(requestProjectsError(error.response.status));
    }
  }
};

export const getDaTaTotal = () => dispatch => {
  dispatch(getDataProjectTypeFromApi(""));
  dispatch(getCustomers());
  dispatch(getListTechStack());

  dispatch(getDataStaffsFromApi());
  dispatch(getDataDepartmentsFromApi());
  dispatch(getListProjectStatus());
};

export const deleteProjects = id => async dispatch => {
  const apiProjects = REACT_APP_API_SERVER_PROJECTS + "/" + id;
  dispatch(requestProjectsPending());
  try {
    const respon = await apiDelete(apiProjects);
    await dispatch(deleteProjectsSuccess(respon.status));
  }
  catch (error) {
    await dispatch(requestProjectsError(error.response.status));
  }
};

export const updateProjects = (id, dataProject, setUpdate) => async dispatch => {
  const apiProjects = REACT_APP_API_SERVER_PROJECTS + "/" + id;
  dispatch(requestProjectsPending());
  try {
    const respon = await apiPut(apiProjects, dataProject);
    await dispatch(updateProjectsSuccess({ ...respon.status, _id: id }));
    setUpdate(false);
  }
  catch (error) {
    await dispatch(requestProjectsError(error.response.status));
  }
};

export const createProjects = dataProjects => async dispatch => {
  const apiCustomer = REACT_APP_API_SERVER_PROJECTS;
  dispatch(requestProjectsPending());
  try {
    const respon = await apiPost(apiCustomer, dataProjects);
    const idNewPost = respon.data.data.recordId;
    await dispatch(createProjectsSuccess({ status: respon.status, idNewPost }));
  }
  catch (error) {
    await dispatch(requestProjectsError(error.response.status));
  }
};
