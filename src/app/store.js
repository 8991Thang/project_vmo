import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../modules/login/login.reducers";
import { projectTypeReducer } from "../modules/project-type/project-type.reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { customersReducer } from "../modules/customers/customers.reducers";
import { projectStatusReducers } from "../modules/project-status/project-status.reducers";
import { techStackReducers } from "../modules/tech-stack/tech-stack.reducers";
import { departmentsReducer } from "../modules/departments/departments.reducers";
import { projectsReducer } from "../modules/projects/projects.reducers";
import { staffsReducer } from "../modules/staffs/staffs.reducers";
import { statusReducers } from "./statusReducers";

const rootReducer = combineReducers({
  projectType: projectTypeReducer,
  token: loginReducer,
  customers: customersReducer,
  projectStatus: projectStatusReducers,
  techStack: techStackReducers,
  departments: departmentsReducer,
  projects: projectsReducer,
  staffs: staffsReducer,
  status: statusReducers,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
