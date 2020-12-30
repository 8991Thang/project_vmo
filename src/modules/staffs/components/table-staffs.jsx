import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Constans from "../staffs.constants";
import { Loading } from "../../../components/loading/loading";
import { getDataStaffsFromApi } from "../../../services/staffs.services";
const queryString = require("query-string");

export const TableStaffs = () => {
  const { data } = useSelector(state => state.staffs);
  const { page } = useSelector(state => state.staffs);
  const { loading } = useSelector(state => state.staffs);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const limitData = queryString.stringify({
      limit: Constans.LIMIT_ITEM_ONE_PAGE,
      page,
    });
    dispatch(getDataStaffsFromApi(limitData));
  }, [page]);

  const onClickRedirect = id => {
    history.push("/staffs/" + id);
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="sm:flex sm:justify-center">
          <table className="flex-col shadow-xl flex justify-center bg-white w-11/12 mr-3 sm:mr-0 sm:w-full rounded-xl">
            <thead>
              <tr className=" flex w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                <th className="pt-5 pb-5 w-1/6 text-center">No.</th>
                <th className="pt-5 pb-5 w-2/6  text-left">Name</th>
                <th className="pt-5 pb-5 w-3/6 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((staff, index) => {
                return (
                  <tr
                    key={staff._id}
                    onClick={() => onClickRedirect(staff._id)}
                    className=" flex w-full justify-around pt-4 pb-4 border-gray-200 hover:bg-gray-200 cursor-pointer border-b-2"
                  >
                    <td className=" w-1/6 text-center" data-title="STT">
                      {index + 1 + Constans.LIMIT_ITEM_ONE_PAGE * (page - 1)}
                    </td>
                    <td className="w-2/6 pr-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {staff.name}
                    </td>
                    <td className="w-3/6 pr-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {staff.email}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
