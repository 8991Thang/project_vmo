import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { render } from "@testing-library/react";
import { TableProjectStatus } from "../modules/project-status/components/table-project-status";
import RowTableProjectStatus from "../modules/project-status/components/row-table-project-status";
import { FormCreateProjectStatus } from "../modules/project-status/components/form-create-project-status";
import { FormEditProjectStatus } from "../modules/project-status/components/form-edit-project-status";
import { FormDetailProjectStatus } from "../modules/project-status/components/form-detail-project-status";
import { PaginationProjectStatus } from "../modules/project-status/components/pagination-project-status";
import { DetailsProjectStatus } from "../modules/project-status/components/details-project-status";
import { BrowserRouter as Router } from "react-router-dom";

describe("Project status module", () => {
  it("render row table project status", () => {
    const table = document.createElement("table");
    const { container, getByText } = render(
      <Provider store={store}>
        <RowTableProjectStatus
          description="description"
          status="active"
          link="/project-status"
          type="project start"
        />
      </Provider>,
      { container: document.body.appendChild(table) },
    );
    expect(getByText(/description/)).toBeInTheDocument();
    expect(getByText(/Active/)).toBeInTheDocument();
    expect(getByText(/project start/)).toBeInTheDocument();
  });
  it("render form details customers", () => {
    const { getByText } = render(<FormDetailProjectStatus />);
    expect(getByText(/Project Status Information/)).toBeInTheDocument();
    expect(getByText(/Description/)).toBeInTheDocument();
  });

  it("render form edit project status", () => {
    const { getByText } = render(
      <FormEditProjectStatus
        valueName="project status"
        valueDes="description"
        valueStatus="active"
      />,
    );
    expect(getByText(/Description/)).toBeInTheDocument();
  });

  it("render pagination project status", () => {
    render(
      <Provider store={store}>
        <PaginationProjectStatus />
      </Provider>,
    );
  });
  it("render details project status", () => {
    const display = render(
      <Provider store={store}>
        <Router>
          <DetailsProjectStatus />
        </Router>
      </Provider>,
    );
  });
  it("render table project status", () => {
    const { getByText } = render(
      <Provider store={store}>
        <TableProjectStatus />
      </Provider>,
    );
  });
  it("render form create project status", () => {
    render(
      <Provider store={store}>
        <FormCreateProjectStatus />
      </Provider>,
    );
  });
});
