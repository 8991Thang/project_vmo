import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { PaginationStaffs } from "../modules/staffs/components/pagination-staffs";
import { FormCreateStaff } from "../modules/staffs/components/pagination-staffs";

describe("Departments module", () => {
  it("render pagination staffs", () => {
    render(
      <Provider store={store}>
        <PaginationStaffs />
      </Provider>,
    );
  });
  // it("render create staffs ", () => {
  //   render(
  //     <Provider store={store}>
  //       <FormCreateStaff />
  //     </Provider>,
  //   );
  // });
});
