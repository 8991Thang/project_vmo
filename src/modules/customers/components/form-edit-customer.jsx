import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../customers.services";
export const FormEditCustomer = ({ dataDetails, setUpdate, setEdit, update }) => {
  const { register: dataForm, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { status: statusRequest } = useSelector(state => state.status);
  const timeoutThenUpdate = 3000;
  useEffect(() => {
    if (statusRequest !== 200) return;
    const timeout = setTimeout(() => {
      setUpdate(!update);
      setEdit(false);
    }, timeoutThenUpdate);
    return () => {
      clearTimeout(timeout);
    };
  }, [statusRequest]);
  const onSubmit = dataCustomers => {
    dataCustomers.priorityNumber = parseInt(dataCustomers.priorityNumber);
    const { _id } = dataDetails;
    dispatch(updateCustomer(_id, dataCustomers));
  };
  return (
    <div className="w-10/12 sm:w-11/12 sm:ml-4 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100  py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="px-10">
            <div className="mt-8 mb-3">
              <div className="pb-6 md:pb-0 flex flex-col">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Name
                </label>
                <div>
                  <label className="input-field sm:w-full lg:w-full inline-flex w-3/4 items-baseline border-none bg-white ">
                    <div className="flex-1 leading-none h-full">
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
                <label htmlFor="name" className="input-label text-base mb-2">
                  Description
                </label>
                <div>
                  <label className="input-field inline-flex  sm:w-full lg:w-full w-3/4 items-baseline border-none">
                    <div className="flex-1 leading-none">
                      <textarea
                        ref={dataForm}
                        id="handle"
                        defaultValue={dataDetails?.description}
                        type="text"
                        name="description"
                        className=" w-full sm:h-20 h-48 py-3 px-5 outline-none  text-gray-700 focus:shadow-lg border-gray-400 border rounded"
                        placeholder="..."
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-3/4  sm:w-full lg:w-full">
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label className="text-sm text-gray-600 mb-2" htmlFor="priority">
                  Priority
                </label>
                <div className="relative mt-2">
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
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label className="text-sm text-gray-600 mb-2" htmlFor="status">
                  Status
                </label>
                <div className="relative mt-2">
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
            <div className=" py-4 flex justify-end sm:mt-5 mt-10">
              <button
                onClick={() => setEdit(false)}
                className="border font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
              >
                CANCEL
              </button>
              <button
                type="sumbit"
                className="border font-medium border-green-700 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
              >
                UPDATE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
