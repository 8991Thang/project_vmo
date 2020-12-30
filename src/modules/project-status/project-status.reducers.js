import produce from "immer";
import * as CONSTANS from "./project-status.constans";

const initialState = {
  limit: CONSTANS.LIMIT_PROJECT_STATUS,
  page: 1,
  numberDoc: 0,
  data: [],
  projectStatusDetails: { record: { name: "" }},
  loading: false,
  link: null,
};
export const projectStatusReducers = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case CONSTANS.GET_PROJECT_STATUS_PENDING:
        draftState.loading = true;
        break;
      case CONSTANS.GET_PROJECT_STATUS_SUCCESS: {
        draftState.numberDoc = action.payload.totalDoc;
        draftState.loading = false;
        draftState.startIndex = action.payload.startIndex;
        const convertData = action.payload.record.map(item => {
          return { ...item, index: action.payload.startIndex++ };
        });
        draftState.data = convertData;
        break;
      }
      case CONSTANS.GET_PROJECT_STATUS_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.SENDING_REQUEST_PROJECT_STATUS_PENDING:
        draftState.link = null;
        draftState.loading = true;
        break;
      case CONSTANS.SENDING_REQUEST_PROJECT_STATUS_SUCCESS: {
        draftState.loading = false;
        draftState.link = "/project-status";
        const totalPage = Math.ceil(draftState.numberDoc / draftState.limit);
        if (draftState.page === totalPage) {
          if ((draftState.numberDoc - 1) % 5 === 0) {
            draftState.page -= 1;
          }
        }
        break;
      }
      case CONSTANS.CREATE_PROJECT_STATUS:
        draftState.loading = false;
        draftState.link = "/project-status/" + action.payload.idNewPost;
        break;
      case CONSTANS.SENDING_REQUEST_PROJECT_STATUS_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.GET_DETAILS_PROJECT_STATUS:
        draftState.loading = false;
        draftState.projectStatusDetails = action.payload;
        break;
      case CONSTANS.CHANGE_PAGE_PROJECT_STATUS:
        draftState.page = action.payload;
        break;
      case CONSTANS.UPDATE_PROJECT_STATUS:
        draftState.loading = false;
        break;
      default:
        return state;
    }
  });
};
