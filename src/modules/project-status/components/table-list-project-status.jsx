import { useEffect, useState } from "react";
import { apiGet } from "../../../api/api";
import { Loading } from "../../../components/loading/loading";
import { PaginationNav } from "../../../components/pagination/pagination";
import { REACT_APP_API_SERVER_PROJECT_STATUS } from "../../../constants/constants";
import { LIMIT_PROJECT_STATUS } from "../project-status.constans";
import RowTableProjectStatus from "./row-table-project-status";
const queryString = require("query-string");
export const TableProjectStatus = () => {
  const [loading, setLoading] = useState(false);
  const [listProjectStatus, setListProjectStatus] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getDataProjectStatus = async () => {
      setLoading(true);
      const stringified = queryString.stringify({ limit: LIMIT_PROJECT_STATUS, page });
      const apiProjectStatus = REACT_APP_API_SERVER_PROJECT_STATUS + "?" + stringified;
      try {
        const respon = await apiGet(apiProjectStatus);
        const { data } = respon.data;
        const { totalDoc } = data;
        const convertData = data.record.map(item => {
          return { ...item, index: data.startIndex++ };
        });
        const totalPage = Math.ceil(totalDoc / LIMIT_PROJECT_STATUS);
        setListProjectStatus({ data: convertData, totalPage });
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
      }
    };
    getDataProjectStatus();
  }, [page]);
  const handlePageChange = e => {
    const numberPage = e;
    setPage(numberPage);
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
            {listProjectStatus.data &&
              listProjectStatus.data.map(projectType => {
                return (
                  <RowTableProjectStatus
                    link={"/project-status/" + projectType._id}
                    key={projectType._id}
                    number={projectType.index + 1}
                    type={projectType.name}
                    description={projectType.description}
                    status={projectType.status}
                  />
                );
              })}
          </table>
          <PaginationNav
            page={page}
            totalPage={listProjectStatus.totalPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
