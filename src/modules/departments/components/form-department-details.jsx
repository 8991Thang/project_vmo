import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const FormDepartmentDetails = props => {
  const { dataDetails } = useSelector(state => state.departments);

  const { sumbitDelete, setUpdate } = props;
  return (
    <div className="w-10/12 rounded-lg shadow-lg bg-white mt-10 sm:w-11/12 sm:w-full ">
      <div className="flex justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center">
          <FcAbout className="text-2xl mr-2" />
          <span className="font-bold text-gray-700 text-lg">Department information</span>
        </div>
      </div>
      <div>
        <div className="px-10 py-5 text-gray-600">
          Name: <b>{dataDetails.name}</b>
        </div>
        <div className="px-10 py-5 text-gray-600">
          Description : <b>{dataDetails.description}</b>
        </div>
        <div className="flex sm: flex-wrap">
          <div className="px-10 py-5 text-gray-600 w-1/3 sm: w-full">
            <p>Staffs :</p>
            <ul className="max-h-48 overflow-x-hidden mt-2">
              {dataDetails.staffsId.map(staff => {
                return (
                  <Link
                    to={"/staffs/" + staff._id}
                    key={staff._id}
                    className="flex justify-start mt-4 cursor-pointer text-gray-700
                              hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                  >
                    <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                    <div className="flex-grow font-medium px-2">{staff.name}</div>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="px-10 py-5 text-gray-600 w-1/3 sm: w-full">
            <p>Projects :</p>
            <ul className="max-h-48  overflow-x-hidden mt-2">
              {dataDetails.projectsId.map(project => (
                <Link
                  to={"/projects/" + project._id}
                  key={project._id}
                  className="flex justify-start mt-4 cursor-pointer text-gray-700
                  hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                >
                  <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                  <div className="flex-grow font-medium px-2">{project.name}</div>
                </Link>
              ))}
            </ul>
          </div>
          <div className="px-10 py-5 text-gray-600 w-1/3 sm: w-full">
            <p>Tech Stacks :</p>
            <ul className="max-h-48 overflow-x-hidden mt-2">
              {dataDetails.techStacksId.map(techStack => (
                <Link
                  to={"/tech-stack/" + techStack._id}
                  key={techStack._id}
                  className="flex justify-start mt-4 cursor-pointer text-gray-700
                  hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
                >
                  <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                  <div className="flex-grow font-medium px-2">{techStack.name}</div>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 flex justify-end">
        <button
          onClick={() => sumbitDelete()}
          className="border border-red-500 bg-red-500 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
        >
          DELETE
        </button>
        <button
          onClick={() => setUpdate(true)}
          className="border border-green-600 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
        >
          EDIT
        </button>
      </div>
    </div>
  );
};
