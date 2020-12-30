import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import { REACT_APP_API_SERVER_DEPARTMENTS } from "../../constants/constants";
import { getDataProjects } from "../../services/project.services";
import { getDataStaffsFromApi } from "../../services/staffs.services";
import { getListTechStack } from "../../services/tech-stack.services";
import {
  createDepartmentSuccess,
  getDepartmentDetailsSuccess,
  sendingDeleteDepartmentSuccess,
  sendingRequestDepartmentError,
  sendingRequestDepartmentPending,
  sendingUpdateDepartmentSuccess,
} from "./departments.actions";

export const sendingRequestNewDepartmentFromApi = dataDepartment => async dispatch => {
  const apiCustomers = REACT_APP_API_SERVER_DEPARTMENTS;
  dispatch(sendingRequestDepartmentPending());
  try {
    const respon = await apiPost(apiCustomers, dataDepartment);
    const idNewPost = respon.data.data.recordId;
    await dispatch(createDepartmentSuccess({ status: respon.status, idNewPost }));
  }
  catch (error) {
    await dispatch(sendingRequestDepartmentError(error.response.status));
  }
};

export const getDepartmentDetailsFromApi = id => async dispatch => {
  const apiDepartmentDetails = REACT_APP_API_SERVER_DEPARTMENTS + "/" + id;
  dispatch(sendingRequestDepartmentPending());
  try {
    const respon = await apiGet(apiDepartmentDetails);
    const { data } = respon.data;
    await dispatch(getDepartmentDetailsSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(sendingRequestDepartmentError(error.response.status));
    }
  }
};

export const deleteDepartment = id => async dispatch => {
  const apideleteDepartment = REACT_APP_API_SERVER_DEPARTMENTS + "/" + id;
  dispatch(sendingRequestDepartmentPending());
  try {
    const respon = await apiDelete(apideleteDepartment);
    await dispatch(sendingDeleteDepartmentSuccess(respon.status));
  }
  catch (error) {
    await dispatch(sendingRequestDepartmentError(error.response.status));
  }
};

export const updateDepartment = (id, dataDepartment) => async dispatch => {
  const apiCustomer = REACT_APP_API_SERVER_DEPARTMENTS + "/" + id;
  dispatch(sendingRequestDepartmentPending());
  try {
    const respon = await apiPut(apiCustomer, dataDepartment);
    await dispatch(sendingUpdateDepartmentSuccess({ ...respon.status, _id: id }));
  }
  catch (error) {
    await dispatch(sendingRequestDepartmentError(error.response.status));
  }
};

export const getDataCreateDepartment = () => dispatch => {
  dispatch(getDataProjects(""));
  dispatch(getDataStaffsFromApi(""));
  dispatch(getListTechStack(""));
};
