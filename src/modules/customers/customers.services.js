import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import { REACT_APP_API_SERVER_CUSTOMERS } from "../../constants/constants";
import {
  createCustomersSuccess,
  deleteCustomersSuccess,
  getCustomersDetails,
  getCustomersError,
  getCustomersPending,
  getCustomersSuccess,
  sendRequestCustomersError,
  sendRequestCustomersPending,
  updateCustomersSuccess,
} from "./customers.actions";

export const getCustomers = limitItems => async dispatch => {
  const apiCustomers = REACT_APP_API_SERVER_CUSTOMERS + "?" + limitItems;
  dispatch(getCustomersPending());
  try {
    const respon = await apiGet(apiCustomers);
    const { data } = respon.data;
    dispatch(getCustomersSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getCustomersError(error.response.status));
    }
  }
};
export const getDetailsCustomers = id => async dispatch => {
  const apiCustomers = REACT_APP_API_SERVER_CUSTOMERS + "/" + id;
  dispatch(getCustomersPending());
  try {
    const respon = await apiGet(apiCustomers);
    const { data } = respon.data;
    dispatch(getCustomersDetails(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getCustomersError(error.response.status));
    }
  }
};
export const updateCustomer = (id, dataCustomer) => async dispatch => {
  const apiCustomer = REACT_APP_API_SERVER_CUSTOMERS + "/" + id;
  dispatch(sendRequestCustomersPending());
  try {
    const respon = await apiPut(apiCustomer, dataCustomer);
    dispatch(updateCustomersSuccess(respon.status));
  }
  catch (error) {
    await dispatch(sendRequestCustomersError(error.response.status));
  }
};
export const deleteCustomer = id => async dispatch => {
  const apiCustomer = REACT_APP_API_SERVER_CUSTOMERS + "/" + id;
  dispatch(sendRequestCustomersPending());
  try {
    const respon = await apiDelete(apiCustomer);
    dispatch(deleteCustomersSuccess(respon.status));
  }
  catch (error) {
    await dispatch(sendRequestCustomersError(error.response.status));
  }
};

export const createCustomers = dataCustomers => async dispatch => {
  const apiCustomers = REACT_APP_API_SERVER_CUSTOMERS;
  dispatch(sendRequestCustomersPending());
  try {
    const respon = await apiPost(apiCustomers, dataCustomers);
    const idNewPost = respon.data.data.recordId;
    dispatch(createCustomersSuccess({ status: respon.status, idNewPost }));
  }
  catch (error) {
    await dispatch(sendRequestCustomersError(error.response.status));
  }
};
