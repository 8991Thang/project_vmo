import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/format-date";

export const FormDetailProjects = ({ dataDetails, deleteProjects, setUpdate }) => {
  const convertDate = formatDate(dataDetails.updatedAt);
  return (
    <div className="w-10/12 rounded-lg shadow-lg bg-white mt-10 ml-5 sm:ml-0 sm:w-11/12">
      <div className="flex justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center">
          <FcAbout className="text-2xl mr-2" />
          <span className="font-bold text-gray-700 text-lg">Project information</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between sm:flex-col">
          <div className="px-10 py-5 w-4/12 sm:w-full  text-gray-600">
            Name: <b>{dataDetails?.name}</b>
          </div>
          <div className="px-10 py-5 w-4/12 sm:w-full  text-gray-600">
            Description: <b>{dataDetails?.description}</b>
          </div>
          <div className="px-10 py-5 w-4/12 sm:w-full  text-gray-600">
            Date Create: <span className="text-xl ml-2">{convertDate}</span>
          </div>
        </div>
        <div className="flex justify-between sm:flex-col">
          <div className="px-10 py-5 w-4/12 sm:w-full  text-gray-600">
            <p>Project Type:</p>
            <ul className="max-h-48 overflow-x-hidden mt-2">
              {dataDetails.projectTypesId.map(type => {
                return (
                  <Link
                    to={"/project-type/" + type._id}
                    key={type._id}
                    className="flex justify-start mt-4 cursor-pointer text-gray-700
                   hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                  >
                    <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                    <div className="flex-grow font-medium px-2">{type.name}</div>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="px-10 py-5 w-4/12 sm:w-full  sm:w-fulltext-gray-600">
            <p>Project Status:</p>
            <Link
              to={"/project-status/" + dataDetails.projectStatusId._id}
              key={dataDetails.projectStatusId._id}
              className="flex justify-start mt-4 cursor-pointer text-gray-700
                   hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
            >
              <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
              <div className="flex-grow font-medium px-2">{dataDetails.projectStatusId.name}</div>
            </Link>
          </div>
          <div className="px-10 py-5 w-4/12 sm:w-full text-gray-600">
            <p>Customers:</p>
            <ul className="max-h-48 overflow-x-hidden mt-2">
              {dataDetails.customersId.map(type => {
                return (
                  <Link
                    to={"/customers/" + type._id}
                    key={type._id}
                    className="flex justify-start mt-4 cursor-pointer text-gray-700
                   hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                  >
                    <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                    <div className="flex-grow font-medium px-2">{type.name}</div>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex sm:flex-col">
          <div className="px-10 py-5 w-4/12 sm:w-full  text-gray-600">
            <p>Staffs:</p>
            <ul className="max-h-48 overflow-x-hidden mt-2">
              {dataDetails.staffsId.map(type => {
                return (
                  <Link
                    to={"/staffs/" + type._id}
                    key={type._id}
                    className="flex justify-start mt-4 cursor-pointer text-gray-700
                   hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                  >
                    <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                    <div className="flex-grow font-medium px-2">{type.name}</div>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="px-10 py-5 w-4/12 sm:w-full  text-gray-600">
            <p>Tech Stack:</p>
            <ul className="max-h-48 overflow-x-hidden mt-2">
              {dataDetails.techStacksId.map(type => {
                return (
                  <Link
                    to={"/tech-stack/" + type._id}
                    key={type._id}
                    className="flex justify-start mt-4 cursor-pointer text-gray-700
                   hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                  >
                    <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                    <div className="flex-grow font-medium px-2">{type.name}</div>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="px-10 py-5 w-4/12 sm:w-full  text-gray-600">
            <p>Departments:</p>
            <ul className="max-h-48 overflow-x-hidden mt-2">
              {dataDetails.departmentsId.map(type => {
                return (
                  <Link
                    to={"/departments/" + type._id}
                    key={type._id}
                    className="flex justify-start mt-4 cursor-pointer text-gray-700
                   hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                  >
                    <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                    <div className="flex-grow font-medium px-2">{type.name}</div>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="px-5 py-4 flex justify-end sm:justify-center">
          <button
            onClick={deleteProjects}
            className="border font-medium border-red-500 bg-red-500 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            DELETE
          </button>
          <button
            onClick={() => setUpdate(true)}
            className="border font-medium border-green-600 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};
