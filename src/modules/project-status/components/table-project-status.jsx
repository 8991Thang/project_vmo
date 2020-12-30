import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../components/loading/loading";
import { changePageLimitProjectStatus } from "../project-status.actions";
import { getListProjectStatus } from "../project-status.services";
import { PaginationProjectStatus } from "./pagination-project-status";
import RowTableProjectStatus from "./row-table-project-status";
const queryString = require("query-string");
export const TableProjectStatus = () => {
  const { data: listProjectStatus } = useSelector(state => state.projectStatus);
  const { loading } = useSelector(state => state.projectStatus);
  const dispatch = useDispatch();
  const { limit } = useSelector(state => state.projectStatus);
  const { page } = useSelector(state => state.projectStatus);
  useEffect(() => {
    const stringified = queryString.stringify({ limit, page });
    dispatch(getListProjectStatus(stringified));
  }, [page]);
  const handlePageChange = e => {
    const page = e.selected + 1;
    dispatch(changePageLimitProjectStatus(page));
  };
  return (
    <div className="h-96 sm:w-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="sm:flex sm:flex-col sm:justify-center sm:items-center">
          <table className="flex-col shadow-xl flex justify-center bg-white w-11/12 rounded-xl">
            <thead>
              <tr className=" flex w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                <th className="pt-5 pb-5 w-1/12">No.</th>
                <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                <th className="pt-5 pb-5 w-2/12 sm:hidden text-left">Description</th>
                <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
              </tr>
            </thead>
            {listProjectStatus.map((projectType, i) => {
              return (
                <RowTableProjectStatus
                  link={"/project-status/" + projectType._id}
                  key={i}
                  number={projectType.index + 1}
                  type={projectType.name}
                  description={projectType.description}
                  status={projectType.status}
                />
              );
            })}
          </table>
          <PaginationProjectStatus onChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};
