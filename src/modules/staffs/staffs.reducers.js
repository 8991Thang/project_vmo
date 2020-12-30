import produce from "immer";
import {
  CHANGE_NUMBER_PAGE,
  CREATE_STAFF_SUCCESS,
  GET_STAFFS_SUCCESS,
  GET_STAFF_DETAIL_SUCCESS,
  SENDING_REQUEST_STAFF_ERROR,
  SENDING_REQUEST_STAFF_PENDING,
  SENDING_REQUEST_STAFF_SUCCESS,
  STAFF_ROLES_SUCCESS,
} from "./staffs.constants";

const initialState = {
  data: [
    {
      _id: "1",
      address: "",
      email: "",
      rolesId: [],
      name: "",
    },
  ],
  link: null,
  techStacks: [],
  dataDetail: {
    staffInfoRecord: {},
    staffExpRecord: {},
  },
  roles: [],
  page: 1,
  numberStaffs: 1,
  loading: false,
};

export const staffsReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case SENDING_REQUEST_STAFF_PENDING:
        draftState.loading = true;
        break;
      case SENDING_REQUEST_STAFF_ERROR:
        draftState.loading = false;
        break;
      case SENDING_REQUEST_STAFF_SUCCESS:
        draftState.link = "/staffs";
        draftState.loading = false;
        break;
      case GET_STAFFS_SUCCESS:
        draftState.loading = false;
        draftState.data = action.payload.record;
        draftState.numberStaffs = action.payload.totalDoc;
        break;

      case CHANGE_NUMBER_PAGE:
        draftState.page = action.payload;
        break;

      case GET_STAFF_DETAIL_SUCCESS:
        draftState.loading = false;
        draftState.dataDetail = action.payload;
        break;
      case STAFF_ROLES_SUCCESS:
        draftState.loading = false;
        draftState.roles = action.payload;
        break;
      case CREATE_STAFF_SUCCESS:
        draftState.link = "/staffs/" + action.payload.idNewPost;
        draftState.loading = false;
        break;
      default:
        return state;
    }
  });
};
