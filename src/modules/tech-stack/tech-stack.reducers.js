import produce from "immer";
import * as CONSTANS from "./tech-stack.constans";
const initialState = {
  numberDoc: 0,
  limit: CONSTANS.LIMIT_TECH_STACK,
  modelName: CONSTANS.MODEL_NAME_TECH_STACK,
  page: 1,
  data: [],
  detailsTeckStack: { record: { name: "" }},
  loading: false,
  link: null,
};
export const techStackReducers = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case CONSTANS.GET_TECH_STACK_PENDING:
        draftState.link = null;
        draftState.loading = true;
        break;
      case CONSTANS.GET_TECH_STACK_SUCCESS: {
        draftState.numberDoc = action.payload.totalDoc;
        draftState.loading = false;
        draftState.startIndex = action.payload.startIndex;
        const convertData = action.payload.record.map(item => {
          return { ...item, index: action.payload.startIndex++ };
        });
        draftState.data = convertData;
        break;
      }
      case CONSTANS.GET_TECH_STACK_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.GET_DETAILS_TECH_STACK:
        draftState.loading = false;
        draftState.detailsTeckStack = action.payload;
        break;
      case CONSTANS.UPDATE_TECH_STACK_SUCESS:
        draftState.loading = false;
        break;
      case CONSTANS.DELETE_TECH_STACK_SUCESS: {
        const totalPage = Math.ceil(draftState.numberDoc / draftState.limit);
        if (draftState.page === totalPage) {
          if ((draftState.numberDoc - 1) % 5 === 0) {
            draftState.page -= 1;
          }
        }
        draftState.loading = false;
        break;
      }
      case CONSTANS.CHANGE_PAGE_LIMIT_TECH_STACK:
        draftState.page = action.payload;
        break;
      case CONSTANS.CREATE_TECH_STACK_SUCESS:
        draftState.loading = false;
        draftState.link = "/tech-stack/" + action.payload.idNewPost;
        break;
      default:
        return state;
    }
  });
};
