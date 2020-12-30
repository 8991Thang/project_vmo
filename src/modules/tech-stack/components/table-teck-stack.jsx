import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../components/loading/loading";
import { changePageLimitTechStack } from "../tech-stack.actions";
import { getListTechStack } from "../tech-stack.services";
import { PaginationTechStack } from "./pagination-tech-stack";
import RowTableTechStack from "./row-table-tech-stack";
const queryString = require("query-string");
export const TableTechStack = () => {
  const { data: listTeckStack } = useSelector(state => state.techStack);
  const { limit } = useSelector(state => state.techStack);
  const { page } = useSelector(state => state.techStack);
  const { loading } = useSelector(state => state.techStack);
  const dispatch = useDispatch();
  useEffect(() => {
    const stringified = queryString.stringify({ limit, page });
    dispatch(getListTechStack(stringified));
  }, [page]);
  const handleChangePage = e => {
    const page = e.selected + 1;
    dispatch(changePageLimitTechStack(page));
  };
  return (
    <div className="h-96 sm:w-full ">
      {loading ? (
        <Loading />
      ) : (
        <div className="sm:w-full sm:flex sm:flex-col  sm:items-center ">
          <table className="flex-col shadow-xl flex justify-center bg-white sm:w-11/12 w-11/12 rounded-xl">
            <thead>
              <tr className=" flex w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                <th className="pt-5 pb-5 w-1/12">No.</th>
                <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                <th className="pt-5 pb-5 w-2/12 text-left">Description</th>
                <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
              </tr>
            </thead>

            {listTeckStack.map((techStack, i) => {
              return (
                <RowTableTechStack
                  link={"/tech-stack/" + techStack._id}
                  key={i}
                  number={techStack.index + 1}
                  type={techStack.name}
                  description={techStack.description}
                  status={techStack.status}
                />
              );
            })}
          </table>
          <PaginationTechStack onChange={handleChangePage} />
        </div>
      )}
    </div>
  );
};
