import { useEffect, useState } from "react";
import { apiGet } from "../../../api/api";
import { Loading } from "../../../components/loading/loading";
import { PaginationNav } from "../../../components/pagination/pagination";
import { REACT_APP_API_SERVER_TECH_STACK } from "../../../constants/constants";
import { LIMIT_TECH_STACK } from "../tech-stack.constans";
import RowTableTechStack from "./row-table-tech-stack";
const queryString = require("query-string");
export const TableTechStack = () => {
  const [loading, setLoading] = useState(false);
  const [listTeckStack, setListTechStack] = useState([]);
  const [page, setPage] = useState(1);
  const getDataTechStack = async () => {
    setLoading(true);
    const stringified = queryString.stringify({ limit: LIMIT_TECH_STACK, page });
    const apiProjectStatus = REACT_APP_API_SERVER_TECH_STACK + "?" + stringified;
    try {
      const respon = await apiGet(apiProjectStatus);
      const { data } = respon.data;
      const { totalDoc } = data;
      const convertData = data.record.map(item => {
        return { ...item, index: data.startIndex++ };
      });
      const totalPage = Math.ceil(totalDoc / LIMIT_TECH_STACK);
      setListTechStack({ data: convertData, totalPage });
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataTechStack();
  }, [page]);
  const handleChangePage = e => {
    const numberPage = e;
    setPage(numberPage);
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

            {listTeckStack.data &&
              listTeckStack.data.map(techStack => {
                return (
                  <RowTableTechStack
                    link={"/tech-stack/" + techStack._id}
                    key={techStack._id}
                    number={techStack.index + 1}
                    type={techStack.name}
                    description={techStack.description}
                    status={techStack.status}
                  />
                );
              })}
          </table>
          <PaginationNav
            page={page}
            totalPage={listTeckStack.totalPage}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};
