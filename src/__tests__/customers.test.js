import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { CreateNewCustomers } from "../modules/customers/components/create-customers";
import { FormDetailCustomers } from "../modules/customers/components/form-detail-customers";
import { FormEditCustomers } from "../modules/customers/components/form-edit-customers";
import { PaginationCustomers } from "../modules/customers/components/pagination-customers";
import { RowTableCustomers } from "../modules/customers/components/row-table-customers";
import { TableCustomers } from "../modules/customers/components/table-customers";
import { BrowserRouter as Router } from "react-router-dom";
import { DetailsCustomers } from "../modules/customers/components/detail-customers";
import { store } from "../app/store";

describe("Customers module", () => {
  it("render rowtable with props customers", () => {
    const table = document.createElement("table");
    const { container, getByText } = render(
      <RowTableCustomers
        number={1}
        type="education"
        description="description"
        priority={5}
        status="active"
        link="/customers"
      />,
      { container: document.body.appendChild(table) },
    );
    expect(getByText(/description/)).toBeInTheDocument();
    expect(getByText(/education/)).toBeInTheDocument();
    expect(getByText(/Active/)).toBeInTheDocument();
    expect(getByText(/1/)).toBeInTheDocument();
  });
  it("render create customers", () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateNewCustomers />
      </Provider>,
    );
    expect(getByText(/Create Customers /)).toBeInTheDocument();
    expect(getByText(/Name/)).toBeInTheDocument();
    expect(getByText(/Description/)).toBeInTheDocument();
    expect(getByText(/Priority/)).toBeInTheDocument();
    expect(getByText(/Status/)).toBeInTheDocument();
  });
  it("render form edit customers", () => {
    const { getByText } = render(
      <Provider store={store}>
        <FormEditCustomers
          nameCustomers="Customers A"
          description="description"
          priority={3}
          status="active"
        />
      </Provider>,
    );
    expect(getByText(/Description/)).toBeInTheDocument();
    expect(getByText(/Active/)).toBeInTheDocument();
  });
  it("render form detail customers", () => {
    const { getByText } = render(
      <Provider store={store}>
        <FormDetailCustomers
          nameCustomers="Customers"
          description="new customer"
          priority={5}
          status="active"
        />
      </Provider>,
    );
    expect(getByText(/Customers/)).toBeInTheDocument();
    expect(getByText(/Description/)).toBeInTheDocument();
    expect(getByText(/Inactive/)).toBeInTheDocument();
  });
  it("render pagination customers", () => {
    render(
      <Provider store={store}>
        <PaginationCustomers />
      </Provider>,
    );
  });
  it("render details customers", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <DetailsCustomers />
        </Router>
      </Provider>,
    );
  });
  it("render table customers", () => {
    const { getByText } = render(
      <Provider store={store}>
        <TableCustomers />
      </Provider>,
    );
  });
});
