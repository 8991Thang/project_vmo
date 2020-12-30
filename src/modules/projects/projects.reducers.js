import produce from "immer";
import * as CONSTANS from "./projects.constans";
const initialState = {
  numberDoc: 1,
  limit: CONSTANS.LIMIT_ITEM_ONE_PAGE,
  page: 1,
  link: null,
  modelName: CONSTANS.MODEL_NAME_PROJECTS,
  dataProjects: { record: [] },
  dataDetails: {
    projectStatusId: [],
    projectTypesId: [],
    customersId: [],
    staffsId: [],
    techStacksId: [],
    departmentsId: [],
  },
  loading: false,
};

export const projectsReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case CONSTANS.SENDING_REQUEST_PROJECTS_PENDING:
        draftState.loading = true;
        break;
      case CONSTANS.GET_PROJECTS_SUCCESS:
        draftState.dataProjects = action.payload;
        draftState.numberDoc = action.payload.totalDoc;
        draftState.loading = false;
        break;
      case CONSTANS.SENDING_REQUEST_PROJECTS_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.GET_DETAILS_PROJECTS:
        draftState.dataDetails = action.payload;
        draftState.loading = false;
        break;
      case CONSTANS.DELETE_PROJECTS: {
        draftState.loading = false;
        draftState.link = "/projects";
        const totalPage = Math.ceil(draftState.numberDoc / draftState.limit);
        if (draftState.page === totalPage) {
          if ((draftState.numberDoc - 1) % 5 === 0) {
            draftState.page -= 1;
          }
        }
        break;
      }

      case CONSTANS.UPDATE_PROJECTS:
        draftState.link = "/" + CONSTANS.MODEL_NAME_PROJECTS + "/" + action.payload._id;
        draftState.loading = false;
        break;
      case CONSTANS.CREATE_PROJECTS_SUCESS: {
        draftState.link = "/" + CONSTANS.MODEL_NAME_PROJECTS + "/" + action.payload.idNewPost;
        draftState.status = action.payload;
        break;
      }
      case CONSTANS.CHANGE_NUMBER_PAGE:
        draftState.page = action.payload;
        break;
      default:
        return state;
    }
  });
};
