import * as CONSTANS from "./customers.constans";

export const getCustomersPending = () => {
  return {
    type: CONSTANS.GET_CUSTOMERS_PENDING,
  };
};
export const getCustomersSuccess = data => {
  return {
    type: CONSTANS.GET_CUSTOMERS_SUCCESS,
    payload: data,
  };
};
export const getCustomersError = error => {
  return {
    type: CONSTANS.GET_CUSTOMERS_ERROR,
    error,
  };
};
export const getCustomersDetails = data => {
  return {
    type: CONSTANS.GET_DETAILS_CUSTOMERS,
    payload: data,
  };
};
export const sendRequestCustomersPending = () => {
  return {
    type: CONSTANS.SENDING_REQUEST_CUSTOMERS_PENDING,
  };
};
export const deleteCustomersSuccess = status => {
  return {
    type: CONSTANS.DELETE_CUSTOMERS_SUCCESS,
    payload: status,
  };
};
export const sendRequestCustomersError = error => {
  return {
    type: CONSTANS.SENDING_REQUEST_CUSTOMERS_ERROR,
    error,
  };
};
export const changePageLimitCustomers = pageChange => {
  return {
    type: CONSTANS.CHANGE_PAGE_CUSTOMERS,
    payload: pageChange,
  };
};

export const createCustomersSuccess = idNewCustomers => {
  return {
    type: CONSTANS.CREATE_CUSTOMERS,
    payload: idNewCustomers,
  };
};
export const updateCustomersSuccess = () => {
  return {
    type: CONSTANS.UPDATE_CUSTOMERS,
    payload: status,
  };
};
