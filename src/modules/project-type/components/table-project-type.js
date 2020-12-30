import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../components/loading/loading";
import { changePageLimitProjectType } from "../project-type.actions";
import { getDataProjectTypeFromApi } from "../project-type.services";
import { PaginationProjectType } from "./pagination-project-type";
import RowTableProjectType from "./row-table-project-type";
const queryString = require("query-string");
export const TableProjectType = () => {
  const { data: dataListProjectType } = useSelector(state => state.projectType);
  const { loading } = useSelector(state => state.projectType);
  const { limit } = useSelector(state => state.projectType);
  const { page } = useSelector(state => state.projectType);
  const dispatch = useDispatch();
  useEffect(() => {
    const stringified = queryString.stringify({ limit, page });
    dispatch(getDataProjectTypeFromApi(stringified));
  }, [page]);
  const handelChangePage = ({ selected }) => {
    dispatch(changePageLimitProjectType(selected + 1));
  };
  return (
    <div className="h-96 sm:w-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="sm:w-full sm:flex sm:flex-col sm:items-center">
          <table className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl">
            <thead>
              <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                <th className="pt-5 pb-5 w-1/12">No.</th>
                <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left">Description</th>
                <th className="pt-5 pb-5 w-1/12 sm:w-2/12">Priority</th>
                <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
              </tr>
            </thead>
            {dataListProjectType.map((projectType, i) => {
              return (
                <RowTableProjectType
                  link={"/project-type/" + projectType._id}
                  key={i}
                  number={projectType.index + 1}
                  type={projectType.name}
                  description={projectType.description}
                  priority={projectType.priorityNumber}
                  status={projectType.status}
                />
              );
            })}
          </table>
          <PaginationProjectType onChange={handelChangePage} />
        </div>
      )}
    </div>
  );
};
