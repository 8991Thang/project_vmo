import * as CONSTANS from "./projects.constans";

export const requestProjectsPending = () => {
  return {
    type: CONSTANS.SENDING_REQUEST_PROJECTS_PENDING,
  };
};
export const requestProjectsError = error => {
  return {
    type: CONSTANS.SENDING_REQUEST_PROJECTS_ERROR,
    error,
  };
};

export const getDataProjectsSuccess = dataProjects => {
  return {
    payload: dataProjects,
    type: CONSTANS.GET_PROJECTS_SUCCESS,
  };
};
export const getDetailsProjectsSuccess = dataProjects => {
  return {
    payload: dataProjects,
    type: CONSTANS.GET_DETAILS_PROJECTS,
  };
};
export const deleteProjectsSuccess = status => {
  return {
    payload: status,
    type: CONSTANS.DELETE_PROJECTS,
  };
};

export const updateProjectsSuccess = status => {
  return {
    payload: status,
    type: CONSTANS.UPDATE_PROJECTS,
  };
};

export const createProjectsSuccess = data => {
  return {
    payload: data,
    type: CONSTANS.CREATE_PROJECTS_SUCESS,
  };
};

export const changeNumberPage = data => {
  return {
    type: CONSTANS.CHANGE_NUMBER_PAGE,
    payload: data,
  };
};
