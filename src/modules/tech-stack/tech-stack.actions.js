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
export const getDetailsTechStackSucess = data => {
  return {
    type: CONSTANS.GET_DETAILS_TECH_STACK,
    payload: data,
  };
};

export const updateTechStackSucess = status => {
  return {
    type: CONSTANS.UPDATE_TECH_STACK_SUCESS,
    payload: status,
  };
};

export const changePageLimitTechStack = page => {
  return {
    type: CONSTANS.CHANGE_PAGE_LIMIT_TECH_STACK,
    payload: page,
  };
};

export const createTechStackSucess = status => {
  return {
    type: CONSTANS.CREATE_TECH_STACK_SUCESS,
    payload: status,
  };
};

export const deleteTechStackSucess = status => {
  return {
    type: CONSTANS.DELETE_TECH_STACK_SUCESS,
    payload: status,
  };
};
