import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { customersReducer } from "../modules/customers/customers.reducers";
import { departmentsReducer } from "../modules/departments/departments.reducers";
import { projectStatusReducers } from "../modules/project-status/project-status.reducers";
import { projectTypeReducer } from "../modules/project-type/project-type.reducers";
import { projectsReducer } from "../modules/projects/projects.reducers";
import { staffsReducer } from "../modules/staffs/staffs.reducers";
import { techStackReducers } from "../modules/tech-stack/tech-stack.reducers";
import { statusReducers } from "../reducers/statusReducers";

const rootReducer = combineReducers({
  projectType: projectTypeReducer,
  customers: customersReducer,
  projectStatus: projectStatusReducers,
  techStack: techStackReducers,
  departments: departmentsReducer,
  projects: projectsReducer,
  staffs: staffsReducer,
  status: statusReducers,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
