import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateTechStack } from "../tech-stack.services";
export const FormEditTechStack = ({
  setUpdate,
  detailsTeckStack,
  setIsEditingDone,
  isEditingDone,
}) => {
  const { register: dataForm, handleSubmit } = useForm();
  const { status: statusRequest } = useSelector(state => state.status);
  const timeoutThenUpdate = 3000;
  const dispatch = useDispatch();
  useEffect(() => {
    if (statusRequest !== 200) return;
    const timeout = setTimeout(() => {
      setUpdate(false);
      setIsEditingDone(!isEditingDone);
    }, timeoutThenUpdate);
    return () => {
      clearTimeout(timeout);
    };
  }, [statusRequest]);
  const onSubmitupdateTechStack = dataTechStacks => {
    const { _id } = detailsTeckStack;
    dispatch(updateTechStack(_id, dataTechStacks));
  };

  return (
    <div className="w-10/12 sm:w-11/12 sm:mt-15 sm:ml-4 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100  py-4">
        <form onSubmit={handleSubmit(onSubmitupdateTechStack)} className="w-full">
          <div className="px-10">
            <div className="my-8 lg:my-3">
              <div className="pb-6 md:pb-0 flex flex-col">
                <label htmlFor="name" className="input-label text-base mb-4">
                  Name
                </label>
                <div>
                  <label className="input-field inline-flex sm:w-full lg:w-full w-3/4 items-baseline border-none">
                    <div className="flex-1 leading-none">
                      <input
                        ref={dataForm}
                        id="handle"
                        defaultValue={detailsTeckStack?.name}
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
            <div>
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
                        defaultValue={detailsTeckStack?.description}
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
              <div className="inline-block mt-2 w-full pr-1">
                <label className="text-sm text-gray-600 mb-2" htmlFor="status">
                  Status
                </label>
                <div className="relative sm:mt-2 mt-3">
                  <select
                    ref={dataForm}
                    className="w-full appearance-none outline-none px-3 py-4 text-gray-700 bg-gray-200 rounded"
                    id="status"
                    name="status"
                    required
                    defaultValue={detailsTeckStack?.status}
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
            <div className=" py-4 flex sm:mt-2 lg:mt-2 justify-end">
              <button
                onClick={() => setUpdate(false)}
                className="border font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-500 focus:outline-none focus:shadow-outline"
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
