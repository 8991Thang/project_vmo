import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { apiPut } from "../../../api/api";
import { LoadingSmallSize } from "../../../components/loading/loading-small-size";
import { REACT_APP_API_SERVER_PROJECT_TYPE, TIMEOUT_REDIRECT } from "../../../constants/constants";
export const FormEditProjectType = ({
  setUpdate,
  dataDetails,
  isEditingDone,
  setIsEditingDone,
}) => {
  const { register: dataForm, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const handeleOnSubmitUpdate = async dataProjectType => {
    setLoading(true);
    const { _id } = dataDetails;
    dataProjectType.priorityNumber = parseInt(dataProjectType.priorityNumber);
    const apiProjectStatus = `${REACT_APP_API_SERVER_PROJECT_TYPE}/${_id}`;
    try {
      const respon = await apiPut(apiProjectStatus, dataProjectType);
      if (respon.status === 200) {
        setLoading(false);
        setTimeout(() => {
          setUpdate(false);
          setIsEditingDone(!isEditingDone);
        }, TIMEOUT_REDIRECT);
      }
    }
    catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="w-10/12 lg:w-11/12 lg:ml-3 sm:full sm:ml-0 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100  py-4">
        <form onSubmit={handleSubmit(handeleOnSubmitUpdate)} className="w-full">
          <div className="px-10">
            <div className="my-8 lg:my-2">
              <div className="pb-6 md:pb-0 flex flex-col">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Name
                </label>
                <div>
                  <label className="input-field inline-flex w-3/4 sm:w-full lg:w-full items-baseline border-none pt-2">
                    <div className="flex-1 leading-none">
                      <input
                        ref={dataForm}
                        id="handle"
                        defaultValue={dataDetails?.name}
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
                  <label className="input-field inline-flex w-3/4 sm:w-full lg:w-full items-baseline border-none ">
                    <div className="flex-1 leading-none">
                      <textarea
                        ref={dataForm}
                        id="handle"
                        defaultValue={dataDetails?.description}
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
            <div className="w-3/4 sm:w-full lg:w-full sm:flex sm:flex-col">
              <div className="inline-block sm:mt-0 w-1/2 pr-1 sm:w-full">
                <label className="text-sm text-gray-600 mb-2" htmlFor="priority">
                  Priority
                </label>
                <div className="relative my-8  sm:my-2">
                  <select
                    ref={dataForm}
                    defaultValue={dataDetails?.priorityNumber}
                    className="w-full appearance-none outline-none px-3 py-4 text-gray-700 bg-gray-200 rounded"
                    id="priority"
                    name="priorityNumber"
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <BiChevronDown className="absolute top-4 text-gray-500 text-2xl right-5" />
                </div>
              </div>
              <div className="inline-block mt-2 sm:w-full w-1/2 pr-1">
                <label className="text-sm text-gray-600 mb-4" htmlFor="status">
                  Status
                </label>
                <div className="relative ">
                  <select
                    ref={dataForm}
                    className="w-full appearance-none outline-none px-3 py-4 text-gray-700 bg-gray-200 rounded"
                    id="status"
                    name="status"
                    required
                    defaultValue={dataDetails?.status}
                  >
                    <option className="mt-10" value="active">
                      Active
                    </option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <BiChevronDown className="absolute top-4 text-gray-500 text-2xl right-5" />
                </div>
              </div>
            </div>
            <div className=" py-4 sm:py-8 flex justify-end">
              <button
                onClick={() => setUpdate(false)}
                className="border font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
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
