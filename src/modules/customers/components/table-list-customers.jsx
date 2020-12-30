import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../components/loading/loading";
import { changePageLimitCustomers } from "../customers.actions";
import { getCustomers } from "../customers.services";
import { PaginationCustomers } from "./pagination-customers";
import { RowTableCustomers } from "./row-table-customer";
const queryString = require("query-string");
export const TableListCustomers = () => {
  const { data: listCustomers } = useSelector(state => state.customers);
  const { limit: limitCustomers } = useSelector(state => state.customers);
  const { loading } = useSelector(state => state.customers);
  const { page } = useSelector(state => state.customers);
  const dispatch = useDispatch();
  useEffect(() => {
    const stringified = queryString.stringify({ limit: limitCustomers, page });
    dispatch(getCustomers(stringified));
  }, [page]);
  const handleChangePage = e => {
    const numberPage = e.selected + 1;
    dispatch(changePageLimitCustomers(numberPage));
  };
  return (
    <div className="h-96 sm:w-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="sm:flex sm:flex-col sm:items-center sm:w-full">
          <table className="flex-col shadow-xl sm:w-11/12 flex justify-center bg-white w-11/12 rounded-xl">
            <thead>
              <tr className=" flex w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                <th className="pt-5 pb-5 w-1/12">No.</th>
                <th className="pt-5 pb-5 w-2/12 text-left ">Name</th>
                <th className="pt-5 pb-5 w-2/12 text-left sm:hidden ">Description</th>
                <th className="pt-5 pb-5 w-1/12 sm:w-2/12">Priority</th>
                <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
              </tr>
            </thead>
            {listCustomers.map((projectType, i) => {
              return (
                <RowTableCustomers
                  link={"/customers/" + projectType._id}
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
          <PaginationCustomers onChange={handleChangePage} />
        </div>
      )}
    </div>
  );
};
