import { useEffect, useState } from "react";
import { apiGet } from "../../../api/api";
import { Loading } from "../../../components/loading/loading";
import { PaginationNav } from "../../../components/pagination/pagination";
import { REACT_APP_API_SERVER_CUSTOMERS } from "../../../constants/constants";
import { LIMIT_CUSTOMERS } from "../customers.constans";
import { RowTableCustomers } from "./row-table-customer";
const queryString = require("query-string");
export const TableListCustomers = () => {
  const [loading, setLoading] = useState(false);
  const [listCustomers, setListCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const getDataCustomers = async () => {
    setLoading(true);
    const stringified = queryString.stringify({ limit: LIMIT_CUSTOMERS, page });
    const apiCustomers = `${REACT_APP_API_SERVER_CUSTOMERS}?${stringified}`;
    try {
      const respon = await apiGet(apiCustomers);
      const { data } = respon.data;
      const { totalDoc } = data;
      const convertData = data.record.map(item => {
        return { ...item, index: data.startIndex++ };
      });
      const totalPage = Math.ceil(totalDoc / LIMIT_CUSTOMERS);
      setListCustomers({ data: convertData, totalPage });
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataCustomers();
  }, [page]);
  const handleChangePage = e => {
    const numberPage = e;
    setPage(numberPage);
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
            {listCustomers.data &&
              listCustomers.data.map(projectType => {
                return (
                  <RowTableCustomers
                    link={"/customers/" + projectType._id}
                    key={projectType._id}
                    number={projectType.index + 1}
                    type={projectType.name}
                    description={projectType.description}
                    priority={projectType.priorityNumber}
                    status={projectType.status}
                  />
                );
              })}
          </table>
          <PaginationNav
            totalPage={listCustomers.totalPage}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};
