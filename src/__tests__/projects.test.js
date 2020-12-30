import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import {PaginationProjects} from "../modules/projects/components/pagination-projects"
import {FormCreateProjects} from "../modules/projects/components/form-create-projects"

describe("Departments module", () => {
    it("render pagination project", () => {
        render(
          <Provider store={store}>
            <PaginationProjects />
          </Provider>,
        );
      });
      it("render create project ", () => {
        render(
          <Provider store={store}>
            <FormCreateProjects />
          </Provider>,
        );
      });
})