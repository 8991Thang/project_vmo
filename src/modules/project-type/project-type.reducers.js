import produce from "immer";
import * as CONSTANS from "./project-type.constants";
const initialState = {
  numberDoc: 0,
  limit: CONSTANS.LIMIT_PROJECT_TYPE,
  page: 1,
  startIndex: 0,
  data: [],
  dataDetails: { record: { name: "" }},
  loading: false,
  link: null,
};
export const projectTypeReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case CONSTANS.GET_PROJECT_TYPE_PENDING:
        draftState.loading = true;
        break;
      case CONSTANS.GET_PROJECT_TYPE_SUCCESS: {
        draftState.numberDoc = action.payload.totalDoc;
        draftState.startIndex = action.payload.startIndex;
        const convertData = action.payload.record.map(item => {
          return { ...item, index: action.payload.startIndex++ };
        });
        draftState.data = convertData;
        draftState.loading = false;
        break;
      }

      case CONSTANS.GET_PROJECT_TYPE_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.GET_DETAILS_PROJECT_TYPE_PENDING:
        draftState.link = null;
        draftState.loading = true;
        break;
      case CONSTANS.GET_DETAILS_PROJECT_TYPE_SUCCESS:
        draftState.loading = false;
        draftState.dataDetails = action.payload;
        break;
      case CONSTANS.GET_DETAILS_PROJECT_TYPE_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.SENDING_REQUEST_PROJECT_TYPE_PENDING:
        draftState.loading = true;
        break;
      case CONSTANS.SENDING_REQUEST_PROJECT_TYPE_SUCCESS: {
        draftState.loading = false;
        const totalPage = Math.ceil(draftState.numberDoc / draftState.limit);
        if (draftState.page === totalPage) {
          if ((draftState.numberDoc - 1) % 5 === 0) {
            draftState.page -= 1;
          }
        }
        draftState.link = "/project-type";
        break;
      }
      case CONSTANS.CREATE_PROJECT_TYPE:
        draftState.loading = false;
        draftState.link = "/project-type/" + action.payload.idNewPost;
        break;
      case CONSTANS.SENDING_REQUEST_PROJECT_TYPE_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.UPDATE_PROJECT_TYPE:
        draftState.loading = false;
        break;
      case CONSTANS.CHANGE_PAGE_PROJECT_TYPE:
        draftState.page = action.payload;
        break;
      default:
        return state;
    }
  });
};
