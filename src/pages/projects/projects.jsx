import { ButtonAddMore } from "../../components/button-add-more/button-add-more";
import { TitlePage } from "../../components/title-page/title-page";
import { TableProjects } from "../../modules/projects/components/table-projects";
import { PaginationProjects } from "../../modules/projects/components/pagination-projects";

export const Projects = () => {
  return (
    <div className="mx-2">
      <div className="flex justify-between w-11/12 mt-10 mb-10 items-end">
        <TitlePage content="Projects" />
        <ButtonAddMore route="/projects/create" />
      </div>
      <TableProjects />
      <PaginationProjects />
    </div>
  );
};
