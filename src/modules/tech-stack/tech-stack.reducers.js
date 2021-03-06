import produce from "immer";
import * as CONSTANS from "./tech-stack.constans";
const initialState = {
  loading: false,
  data: [],
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
      default:
        return state;
    }
  });
};
