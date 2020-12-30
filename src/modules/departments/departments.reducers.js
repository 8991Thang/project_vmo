import produce from "immer";
import * as CONSTANS from "./departments.constants";
const initialState = {
  data: [],
  link: null,
  dataDetails: {
    name: "",
    description: "",
    projectsId: [],
    staffsId: [],
    techStacksId: [],
  },
  page: 1,
  numberDepartments: 1,
  loading: false,
};

export const departmentsReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case CONSTANS.GET_DEPARTMENTS_SUCCESS:
        draftState.loading = false;
        draftState.data = action.payload.record;
        draftState.numberDepartments = action.payload.totalDoc;
        break;

      case CONSTANS.CHANGE_NUMBER_PAGE:
        draftState.page = action.payload;
        break;

      case CONSTANS.SENDING_REQUEST_DEPARTMENT_PENDING:
        draftState.loading = true;
        break;

      case CONSTANS.SENDING_REQUEST_DEPARTMENT_SUCCESS: {
        draftState.loading = false;
        draftState.link = "/" + CONSTANS.DEPARTMENTS;
        const totalPage = Math.ceil(draftState.numberDoc / draftState.limit);
        if (draftState.page === totalPage) {
          if ((draftState.numberDoc - 1) % 5 === 0) {
            draftState.page -= 1;
          }
        }
        break;
      }
      case CONSTANS.SENDING_REQUEST_DEPARTMENT_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.GET_DEPARTMENT_DETAILS_SUCCESS:
        draftState.loading = false;
        draftState.success = false;
        draftState.dataDetails = action.payload.record;
        break;
      case CONSTANS.CREATE_DEPARTMENT_SUCCESS:
        draftState.link = "/" + CONSTANS.DEPARTMENTS + "/" + action.payload.idNewPost;
        draftState.loading = false;
        break;

      case CONSTANS.DELETE_DEPARTMENT_SUCCESS:
        draftState.link = "/" + CONSTANS.DEPARTMENTS;
        draftState.loading = false;
        break;

      case CONSTANS.UPDATE_DEPARTMENT_SUCCESS:
        draftState.loading = false;
        draftState.link = "/" + CONSTANS.DEPARTMENTS + "/" + action.payload._id;
        break;
      default:
        return state;
    }
  });
};
