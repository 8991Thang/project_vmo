import { ButtonAddMore } from "../../components/button-add-more/button-add-more";
import { TitlePage } from "../../components/title-page/title-page";
import { TableListCustomers } from "../../modules/customers/components/table-list-customers";
export const Customers = () => {
  return (
    <div className="sm:flex sm:flex-col sm:items-center">
      <div className="flex justify-between w-11/12 sm:mb-5 sm:mt-14 sm:w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Customers" />
        <ButtonAddMore route="/customers/create" />
      </div>
      <TableListCustomers />
    </div>
  );
};
