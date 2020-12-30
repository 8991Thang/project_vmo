import produce from "immer";
import * as CONSTANS from "./customers.constans";
const initialState = {
  modelName: CONSTANS.MODEL_NAME_CUSTOMERS,
  limit: CONSTANS.LIMIT_CUSTOMERS,
  page: 1,
  data: [],
  dataDetails: { record: [{ name: "" }] },
  numberDoc: 0,
  loading: false,
  link: null,
};
export const customersReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case CONSTANS.GET_CUSTOMERS_PENDING:
        draftState.loading = true;
        break;
      case CONSTANS.GET_CUSTOMERS_SUCCESS: {
        draftState.numberDoc = action.payload.totalDoc;
        draftState.loading = false;
        draftState.startIndex = action.payload.startIndex;
        const convertData = action.payload.record.map(item => {
          return { ...item, index: action.payload.startIndex++ };
        });
        draftState.data = convertData;
        break;
      }
      case CONSTANS.GET_CUSTOMERS_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.GET_DETAILS_CUSTOMERS:
        draftState.loading = false;
        draftState.dataDetails = action.payload;
        break;

      case CONSTANS.SENDING_REQUEST_CUSTOMERS_PENDING:
        draftState.link = null;
        draftState.loading = true;
        break;

      case CONSTANS.DELETE_CUSTOMERS_SUCCESS: {
        draftState.loading = false;
        const totalPage = Math.ceil(draftState.numberDoc / draftState.limit);
        if (draftState.page === totalPage) {
          if ((draftState.numberDoc - 1) % 5 === 0) {
            draftState.page -= 1;
          }
        }
        draftState.link = "/customers";
        break;
      }
      case CONSTANS.CREATE_CUSTOMERS:
        draftState.link = "/customers/" + action.payload.idNewPost;
        draftState.loading = false;
        break;
      case CONSTANS.UPDATE_CUSTOMERS:
        draftState.loading = false;
        break;

      case CONSTANS.SENDING_REQUEST_CUSTOMERS_ERROR:
        draftState.loading = false;
        break;

      case CONSTANS.CHANGE_PAGE_CUSTOMERS:
        draftState.page = action.payload;
        break;

      default:
        return state;
    }
  });
};
