import { useEffect, useState } from "react";
import { apiGet } from "../../../api/api";
import { Loading } from "../../../components/loading/loading";
import { PaginationNav } from "../../../components/pagination/pagination";
import { REACT_APP_API_SERVER_PROJECT_TYPE } from "../../../constants/constants";
import { LIMIT_PROJECT_TYPE } from "../project-type.constants";
import RowTableProjectType from "./row-table-project-type";
const queryString = require("query-string");
export const TableProjectType = () => {
  const [loading, setLoading] = useState(false);
  const [ListProjectType, setListProjectType] = useState([]);
  const [page, setPage] = useState(1);
  const getDataProjectStatus = async () => {
    setLoading(true);
    const stringified = queryString.stringify({ limit: LIMIT_PROJECT_TYPE, page });
    const apiProjectStatus = REACT_APP_API_SERVER_PROJECT_TYPE + "?" + stringified;
    try {
      const respon = await apiGet(apiProjectStatus);
      const { data } = respon.data;
      const { totalDoc } = data;
      const convertData = data.record.map(item => {
        return { ...item, index: data.startIndex++ };
      });
      const totalPage = Math.ceil(totalDoc / LIMIT_PROJECT_TYPE);
      setListProjectType({ data: convertData, totalPage });
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataProjectStatus();
  }, [page]);
  const handelChangePage = e => {
    const numberPage = e;
    setPage(numberPage);
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
            {ListProjectType.data &&
              ListProjectType.data.map(projectType => {
                return (
                  <RowTableProjectType
                    link={"/project-type/" + projectType._id}
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
            page={page}
            totalPage={ListProjectType.totalPage}
            onChange={handelChangePage}
          />
        </div>
      )}
    </div>
  );
};
