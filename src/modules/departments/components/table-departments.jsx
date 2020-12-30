import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataDepartmentsFromApi } from "../../../services/departments.services";
import { RowTableDepartments } from "./row-table-departments";
import * as Constans from "../departments.constants";
import { Loading } from "../../../components/loading/loading";
const queryString = require("query-string");

export const TableDepartments = () => {
  const { data } = useSelector(state => state.departments);
  const { page } = useSelector(state => state.departments);
  const { loading } = useSelector(state => state.departments);
  const dispatch = useDispatch();

  useEffect(() => {
    const limitData = queryString.stringify({
      limit: Constans.LIMIT_ITEM_ONE_PAGE,
      page,
    });
    dispatch(getDataDepartmentsFromApi(limitData));
  }, [page]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center ">
          <table className="flex-col shadow-xl flex justify-center bg-white w-11/12  rounded-xl">
            <thead>
              <tr className=" flex w-full bg-indigo-700 justify-around text-white rounded-t-xl  cursor-pointer hover:bg-indigo-600">
                <th className="pt-5 pb-5 w-1/6 text-center">No.</th>
                <th className="pt-5 pb-5 w-2/6 pr-12 text-left">Name</th>
                <th className="pt-5 pb-5 w-3/6 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((department, i) => {
                return (
                  <RowTableDepartments
                    link={"/departments/" + department._id}
                    key={department._id}
                    number={i + 1 + Constans.LIMIT_ITEM_ONE_PAGE * (page - 1)}
                    name={department.name}
                    description={department.description}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
