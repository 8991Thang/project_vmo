import { ButtonAddMore } from "../../components/button-add-more/button-add-more";
import { TitlePage } from "../../components/title-page/title-page";
import { TableStaffs } from "../../modules/staffs/components/table-staffs";
import { PaginationStaffs } from "../../modules/staffs/components/pagination-staffs";

export const Staffs = () => {
  return (
    <div className="mx-2">
      <div className="flex justify-between w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Staffs" />
        <ButtonAddMore route="/staffs/create" />
      </div>
      <TableStaffs />
      <PaginationStaffs />
    </div>
  );
};
