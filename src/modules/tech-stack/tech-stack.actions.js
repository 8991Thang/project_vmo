import * as CONSTANS from "./tech-stack.constans";

export const getTechStackSuccess = data => {
  return {
    type: CONSTANS.GET_TECH_STACK_SUCCESS,
    payload: data,
  };
};
export const getTechStackError = error => {
  return {
    type: CONSTANS.GET_TECH_STACK_ERROR,
    error,
  };
};

export const getTechStackPending = () => {
  return {
    type: CONSTANS.GET_TECH_STACK_PENDING,
  };
};
