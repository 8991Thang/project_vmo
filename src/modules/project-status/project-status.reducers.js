import produce from "immer";
import * as CONSTANS from "./project-status.constans";

const initialState = {
  loading: false,
  data: [],
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
      default:
        return state;
    }
  });
};
