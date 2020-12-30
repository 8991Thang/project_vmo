import { FcAbout } from "react-icons/fc";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStaff } from "../staffs.services";

export const FormStaffDetail = ({ setUpdate }) => {
  const dispatch = useDispatch();

  const { staffInfoRecord } = useSelector(state => state.staffs.dataDetail);
  const { staffExpRecord } = useSelector(state => state.staffs.dataDetail);

  const { roles } = useSelector(state => state.staffs);

  // const { techStacks } = useSelector(state => state.staffs);
  // const [listSkills, setListSkills] = useState([]);

  // useEffect(() => {
  //   changeArrSkill(staffExpRecord.skills, techStacks);
  // }, []);

  const sumbitDeleteStaff = () => {
    const { _id } = staffInfoRecord;
    dispatch(deleteStaff(_id));
  };

  // const changeArrSkill = (arrSkills = [], arrTechStack = []) => {
  //   const newArr = [];
  //   arrSkills.forEach(item => {
  //     const techStack = arrTechStack.find(tech => tech._id === item.techStackId);
  //     if (techStack !== undefined) {
  //       newArr.push({ name: techStack.name, level: item.level, _id: techStack._id });
  //     }
  //   });
  //   setListSkills(newArr);
  // };
  const arrToString = (arr = []) => {
    return arr.toString().replace(/,/g, ", ");
  };

  const findRole = (listRole = [{ _id: "", roleName: "" }]) => {
    const role = listRole.find(item => item._id === staffInfoRecord.role);
    return role && role.roleName || "";
  };
  return (
    <div className="w-10/12 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center">
          <FcAbout className="text-2xl mr-2" />
          <span className="font-bold text-gray-700 text-lg">Staff information</span>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/2 sm:w-full px-10 py-5 text-gray-600">
          Name: <b>{staffInfoRecord.name}</b>
        </div>
        <div className="w-1/2 sm:w-full px-10 py-5 text-gray-600">
          Email: <b>{staffInfoRecord.email}</b>
        </div>
        <div className="w-1/2 sm:w-full px-10 py-5 text-gray-600">
          Phone umber: <b>{staffInfoRecord.phoneNumber}</b>
        </div>
        <div className="w-1/2 sm:w-full px-10 py-5 text-gray-600">
          Address: <b>{staffInfoRecord.address}</b>
        </div>

        <div className="w-1/2 sm:w-full px-10 py-5 text-gray-600">
          Identity number: <b>{staffInfoRecord.identityNumber}</b>
        </div>

        <div className="w-1/2 sm:w-full px-10 py-5 text-gray-600">
          Date of birth: <b>{staffInfoRecord.dob && staffInfoRecord.dob.substr(0, 10)}</b>
        </div>
        <div className="w-1/2 sm:w-full px-10 py-5 text-gray-600">
          Certificate: <b>{arrToString(staffInfoRecord.certs)}</b>
        </div>
        <div className="w-1/2 sm:w-full px-10 py-5 text-gray-600">
          Languages: <b>{arrToString(staffInfoRecord.languages)}</b>
        </div>
        <div className="px-10 py-5 text-gray-600 w-1/2 sm:w-full">
          <p>Skills:</p>
          <ul className="max-h-48 overflow-x-hidden mt-2">
            {staffExpRecord && staffExpRecord.skills && staffExpRecord.skills.map(techStack => (
              <Link
                to={"/tech-stack/" + techStack.techStackId._id}
                key={techStack.techStackId._id}
                className="flex justify-start mt-4 cursor-pointer text-gray-700
                  hover:text-gray-500 hover:bg-gray-100 rounded-md py-2 my-2"
              >
                <span className="bg-green-500 h-2 w-2 m-2 rounded-full"></span>
                <span className="font-medium px-2">{techStack.techStackId.name + " - "}</span>
                <span className="font-medium">{techStack.level}</span>
              </Link>
            ))}
          </ul>
        </div>
        <div className="px-10 py-5 text-gray-600 w-1/2 sm:w-full">
          <p>Role:
            <b>{findRole(roles)}</b>
          </p>
        </div>
      </div>
      <div className="px-5 py-4 flex justify-end sm:justify-center">
        <button
          onClick={() => sumbitDeleteStaff()}
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
