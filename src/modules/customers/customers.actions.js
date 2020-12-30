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
export const changePageLimitCustomers = pageChange => {
  return {
    type: CONSTANS.CHANGE_PAGE_CUSTOMERS,
    payload: pageChange,
  };
};
