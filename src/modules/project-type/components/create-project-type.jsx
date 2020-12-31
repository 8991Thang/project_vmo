import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { apiPost } from "../../../api/api";
import { LoadingSmallSize } from "../../../components/loading/loading-small-size";
import { TitlePage } from "../../../components/title-page/title-page";
import { REACT_APP_API_SERVER_PROJECT_TYPE, TIMEOUT_REDIRECT } from "../../../constants/constants";
export const FormCreateProjectType = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { register: dataForm, handleSubmit } = useForm();
  const linkProjectType = "/project-type/";
  const onSubmit = async dataNewProjectStatus => {
    setLoading(true);
    dataNewProjectStatus.priorityNumber = parseInt(dataNewProjectStatus.priorityNumber);
    const apiProjectType = REACT_APP_API_SERVER_PROJECT_TYPE;
    try {
      const respon = await apiPost(apiProjectType, dataNewProjectStatus);
      if (respon.status === 200) {
        const idNewPost = respon.data.data.recordId;
        setLoading(false);
        setTimeout(() => {
          history.push(linkProjectType + idNewPost);
        }, TIMEOUT_REDIRECT);
      }
    }
    catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="mt-10">
        <div className="sm:ml-5">
          <TitlePage content="Create Project Type " />
        </div>
        <div className="flex justify-center">
          <div className="leading-loose lg:mr-4 lg:w-full w-6/12 sm:w-11/12">
            <form
              className=" m-4 p-10 sm:m-0 sm:mt-6 sm:mb-5 bg-white rounded shadow-xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="text-gray-800 font-medium items-center flex mb-5">
                <FcAbout className="text-xl  mr-1" />
                <p> Project type information</p>
              </div>
              <div>
                <label className="block text-sm text-gray-00 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  ref={dataForm}
                  className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-md   border-gray-400 border  rounded"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-600 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  ref={dataForm}
                  className="w-full outline-none px-5 py-4   text-gray-700 focus:shadow-lg border-gray-400 border rounded"
                  id="description"
                  name="description"
                  type="text"
                  required
                  placeholder="Description"
                />
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label className="text-sm text-gray-600 mb-2" htmlFor="priority">
                  Priority
                </label>
                <div className="relative ">
                  <select
                    ref={dataForm}
                    className="w-full appearance-none outline-none px-3 py-3 text-gray-700 bg-gray-200 rounded"
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
                <div className="relative ">
                  <select
                    ref={dataForm}
                    className="w-full appearance-none outline-none px-3 py-3 text-gray-700 bg-gray-200 rounded"
                    id="status"
                    name="status"
                    required
                  >
                    <option className="mt-10" value="active">
                      Active
                    </option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <BiChevronDown className="absolute top-4 text-gray-500 text-2xl right-5" />
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                <div className="m-3">
                  <button
                    style={{ outline: "none" }}
                    className="bg-white  text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 flex items-center"
                  >
                    {" "}
                    {loading ? (
                      <LoadingSmallSize />
                    ) : (
                      <div className="flex h-10 items-center">
                        <span className="mr-1">Add</span>
                        <BsPlus className="text-xl font-bold " />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
