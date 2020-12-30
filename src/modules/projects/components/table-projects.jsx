import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../components/loading/loading";
import { getDataProjects } from "../../../services/project.services";
import { notifyUpdate } from "../../../utils/notifications-when-update";
import RowTableProjects from "./row-table-projects";
import { LIMIT_ITEM_ONE_PAGE } from "../projects.constans";
const queryString = require("query-string");

export const TableProjects = () => {
  const { dataProjects } = useSelector(state => state.projects);
  const { loading } = useSelector(state => state.projects);
  const { status } = useSelector(state => state.projects);
  const {
    limit,
  } = useSelector(state => state.projects);
  const { page } = useSelector(state => state.projects);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const stringified = queryString.stringify({ limit, page });
    dispatch(getDataProjects(stringified));
  }, [page]);
  useEffect(() => {
    if (status === 401) {
      notifyUpdate(status, history);
    }
  }, [status]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center">
          <table className="flex-col shadow-xl flex justify-center bg-white w-11/12 rounded-xl">
            <thead>
              <tr className=" flex w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                <th className="pt-5 pb-5 w-1/12">No.</th>
                <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                <th className="pt-5 pb-5 w-2/12 text-left">Description</th>
                <th className="pt-5 pb-5 w-2/12 sm:hidden">Date Create</th>
              </tr>
            </thead>
            {dataProjects.record.map((projects, i) => {
              return (
                <RowTableProjects
                  link={"/projects/" + projects._id}
                  key={i}
                  number={i + 1 + LIMIT_ITEM_ONE_PAGE * (page - 1)}
                  type={projects.name}
                  description={projects.description}
                  date={projects.createdAt}
                />
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};
