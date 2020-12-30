import { ButtonAddMore } from "../../components/button-add-more/button-add-more";
import { TitlePage } from "../../components/title-page/title-page";
import { TableProjectType } from "../../modules/project-type/components/table-project-type";
export const ProjectType = () => {
  return (
    <div className=" sm:w-full sm:flex sm:items-center sm:flex-col">
      <div className="flex justify-between sm:mb-5 sm:mt-14 w-11/12 sm:w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Project Type" />
        <ButtonAddMore route="/project-type/create" />
      </div>
      <TableProjectType />
    </div>
  );
};
