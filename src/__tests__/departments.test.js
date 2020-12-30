import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import {PaginationDepartments} from "../modules/departments/components/pagination-departments"
import {FormCreateDepartments} from "../modules/departments/components/form-create-departments"

describe("Departments module", () => {
    it("render pagination department", () => {
        render(
          <Provider store={store}>
            <PaginationDepartments />
          </Provider>,
        );
      });
      it("render create department ", () => {
        render(
          <Provider store={store}>
            <FormCreateDepartments />
          </Provider>,
        );
      });
})