import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { apiPut } from "../../../api/api";
import { LoadingSmallSize } from "../../../components/loading/loading-small-size";
import {
  REACT_APP_API_SERVER_PROJECT_STATUS,
  TIMEOUT_REDIRECT,
} from "../../../constants/constants";
export const FormEditProjectStatus = ({
  setEditStatus,
  projectStatusDetails,
  setUpdate,
  update,
}) => {
  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const handeleOnSubmitUpdate = async dataProjectStatus => {
    setLoading(true);
    const { _id } = projectStatusDetails;
    const apiProjectStatus = `${REACT_APP_API_SERVER_PROJECT_STATUS}/${_id}`;
    try {
      const respon = await apiPut(apiProjectStatus, dataProjectStatus);
      if (respon.status === 200) {
        setLoading(false);
        setTimeout(() => {
          setEditStatus(false);
          setUpdate(!update);
        }, TIMEOUT_REDIRECT);
      }
    }
    catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="w-10/12 lg:w-11/12 lg:ml-3 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100  py-4">
        <form onSubmit={handleSubmit(handeleOnSubmitUpdate)} className="w-full">
          <div className="px-10">
            <div className="my-8 lg:my-3">
              <div className="pb-6 md:pb-0 flex flex-col">
                <label htmlFor="name" className="input-label text-base mb-4">
                  Name
                </label>
                <div>
                  <label className="input-field inline-flex sm:w-full lg:w-full w-3/4 items-baseline border-none ">
                    <div className="flex-1 leading-none">
                      <input
                        ref={dataForm}
                        id="handle"
                        defaultValue={projectStatusDetails?.name}
                        type="text"
                        className=" w-full py-3 px-5 outline-none  text-gray-700 focus:shadow-lg border-gray-400 border rounded"
                        name="name"
                        placeholder="Jane"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="my-3">
              <div className="pb-6 md:pb-0 flex flex-col">
                <label htmlFor="name" className="input-label text-base mb-4">
                  Description
                </label>
                <div>
                  <label className="input-field inline-flex sm:w-full lg:w-full w-3/4 items-baseline border-none ">
                    <div className="flex-1 leading-none">
                      <textarea
                        ref={dataForm}
                        id="handle"
                        defaultValue={projectStatusDetails?.description}
                        type="text"
                        className=" w-full sm:h-20 h-48 py-3 px-5 outline-none  text-gray-700 focus:shadow-lg border-gray-400 border rounded"
                        name="description"
                        placeholder="..."
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-3/4 sm:w-full lg:w-full">
              <div className="inline-block w-full pr-1 ">
                <label className="text-sm text-gray-600 mb-2" htmlFor="status">
                  Status
                </label>
                <div className="relative sm:mt-3">
                  <select
                    ref={dataForm}
                    className="w-full appearance-none outline-none px-3 py-4 text-gray-700 bg-gray-200 rounded"
                    id="status"
                    name="status"
                    type="text"
                    required
                    placeholder="Country"
                    defaultValue={projectStatusDetails?.status}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <BiChevronDown className="absolute top-4 text-gray-500 text-2xl right-5" />
                </div>
              </div>
            </div>
            <div className=" py-4 flex justify-end lg:mt-4">
              <button
                onClick={() => setEditStatus(false)}
                className="border font-medium border-red-500 bg-red-500 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
              >
                CANCEL
              </button>
              <button
                type="sumbit"
                className="border font-medium border-green-700 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
              >
                {loading ? <LoadingSmallSize size={5} /> : <p>UPDATE</p>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
