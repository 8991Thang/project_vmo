import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { DetailsTeckStack } from "../modules/tech-stack/components/details-tech-stack";
import { FormDetailTechStack } from "../modules/tech-stack/components/form-detail-tech-stack";
import { FormEditTechStack } from "../modules/tech-stack/components/form-edit-tech-stack";
import { PaginationTechStack } from "../modules/tech-stack/components/pagination-tech-stack";
import { TableTechStack } from "../modules/tech-stack/components/table-teck-stack";
import { BrowserRouter as Router } from "react-router-dom";
import RowTableTechStack from "../modules/tech-stack/components/row-table-tech-stack";
describe("Tech stack module", () => {
  it("render form details tech stack", () => {
    const { getByText } = render(
      <FormDetailTechStack
        nameTechStack="nameTechStack"
        description="description"
        status="active"
      />,
    );
    expect(getByText(/Tech Stack Information/)).toBeInTheDocument();
    expect(getByText(/Description/)).toBeInTheDocument();
    expect(getByText(/Inactive/)).toBeInTheDocument();
  });
  it("render rowtable with props project type", () => {
    const table = document.createElement("table");
    const { container, getByText } = render(
      <RowTableTechStack
        number={1}
        type="education"
        description="description"
        status="active"
        link="/customers"
      />,
      { container: document.body.appendChild(table) },
    );
    expect(getByText(/education/)).toBeInTheDocument();
    expect(getByText(/Active/)).toBeInTheDocument();
    expect(getByText(/description/)).toBeInTheDocument();
    expect(getByText(/1/)).toBeInTheDocument();
  });
  it("render table tech stack", () => {
    const { getByText } = render(
      <Provider store={store}>
        <TableTechStack />
      </Provider>,
    );
  });
  it("render pagination tech stack", () => {
    render(
      <Provider store={store}>
        <PaginationTechStack />
      </Provider>,
    );
  });
  it("render details tech stack", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <DetailsTeckStack />
        </Router>
      </Provider>,
    );
  });
});
