import { ButtonAddMore } from "../../components/button-add-more/button-add-more";
import { TitlePage } from "../../components/title-page/title-page";
import { TableTechStack } from "../../modules/tech-stack/components/table-teck-stack";
export const TechStack = () => {
  return (
    <div className="sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center">
      <div className="flex justify-between sm:w-11/12 w-11/12 sm:mb-5 sm:mt-14 mt-10 mb-10 items-end">
        <TitlePage content="Teck Stack" />
        <ButtonAddMore route="/tech-stack/create" />
      </div>
      <TableTechStack />
    </div>
  );
};
