import { apiGet } from "../api/api";
import { REACT_APP_API_SERVER_CUSTOMERS } from "../constants/constants";
import {
  getCustomersError,
  getCustomersPending,
  getCustomersSuccess,
} from "../modules/customers/customers.actions";

export const getCustomers = limitItems => async dispatch => {
  const apiCustomers = REACT_APP_API_SERVER_CUSTOMERS + "?" + limitItems;
  dispatch(getCustomersPending());
  try {
    const respon = await apiGet(apiCustomers);
    const { data } = respon.data;
    await dispatch(getCustomersSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      await dispatch(getCustomersError(error.response.status));
    }
  }
};
