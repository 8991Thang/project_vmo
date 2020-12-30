import { ButtonAddMore } from "../../components/button-add-more/button-add-more";
import { TitlePage } from "../../components/title-page/title-page";
import { TableProjectStatus } from "../../modules/project-status/components/table-project-status";

export const ProjectStatus = () => {
  return (
    <div className="sm:flex  sm:flex-col sm:items-center">
      <div className="flex justify-between sm:w-11/12 sm:mb-5 sm:mt-14 w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Project Status" />
        <ButtonAddMore route="/project-status/create" />
      </div>
      <TableProjectStatus />
    </div>
  );
};
