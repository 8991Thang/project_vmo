import { ButtonAddMore } from "../../components/button-add-more/button-add-more";
import { TitlePage } from "../../components/title-page/title-page";
import { TableDepartments } from "../../modules/departments/components/table-departments";
import { PaginationDepartments } from "../../modules/departments/components/pagination-departments";

export const Departments = () => {
  return (
    <div >
      <div className="flex justify-between  w-11/12 mt-10 mb-10 items-end sm:mx-2">
        <TitlePage content="Departments" />
        <ButtonAddMore name="Create Department" route="/departments/create" />
      </div>
      <TableDepartments/>
      <PaginationDepartments />
    </div>
  );
};
