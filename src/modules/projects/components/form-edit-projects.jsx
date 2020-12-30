import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { getDaTaTotal, updateProjects } from "../projects.services";

import { setLinkRedirect } from "../../../app/statusReducers";
import { INACTIVE } from "../../../constants/constants";

const oneItemDisabled = item => {

  if (item.status === INACTIVE) {
    return { label: item.name, value: item._id, disabled: true };
  }
  return [{ label: item.name, value: item._id }];
};
const addDisabled = (arr = []) => {
  return arr.map(item => {
    if (item.status === INACTIVE) {
      return { label: item.name, value: item._id, disabled: true };
    }
    return { label: item.name, value: item._id };
  });
};

export const FormEditProjects = ({ setUpdate, dataDetails }) => {
  const { link } = useSelector(state => state.projects);

  const dataProjectType = useSelector(state => state.projectType.data);
  const dataCustomers = useSelector(state => state.customers.data);
  const dataTechStack = useSelector(state => state.techStack.data);

  const dataStaffs = useSelector(state => state.staffs.data);
  const dataProjectStatus = useSelector(state => state.projectStatus.data);
  const dataDepartment = useSelector(state => state.departments.data);

  const { loading: loadingProjectType } = useSelector(state => state.projectType);
  const { loading: loadingCustomers } = useSelector(state => state.customers);
  const { loading: loadingTechStack } = useSelector(state => state.techStack);

  const { loading: loadingStaff } = useSelector(state => state.staffs);
  const { loading: loadingProjectStatus } = useSelector(state => state.staffs);
  const { loading: loadingDepartments } = useSelector(state => state.departments);

  const [projectType, setProjectType] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [techStack, setTechStack] = useState([]);

  const [staffs, setStaffs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);

  const { register: dataForm, handleSubmit } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLinkRedirect(link));
  }, [link]);

  useEffect(() => {
    setProjectType(addDisabled(dataDetails.projectTypesId));
    setCustomers(addDisabled(dataDetails.customersId));
    setTechStack(addDisabled(dataDetails.techStacksId));
    setStaffs(addDisabled(dataDetails.staffsId));
    setDepartments(addDisabled(dataDetails.departmentsId));
    setProjectStatus(oneItemDisabled(dataDetails.projectStatusId));
    dispatch(getDaTaTotal());
  }, []);

  const handleOnSubmitEdit = dataForm => {
    const dataNewProjects = {
      update: {
        ...dataForm,
        techStacksId: techStack.map(item => item.value),
        projectTypesId: projectType.map(item => item.value),
        departmentsId: departments.map(item => item.value),
        staffsId: staffs.map(item => item.value),
        customersId: customers.map(item => item.value),
        projectStatusId: projectStatus[0].value,
      },
    };
    dispatch(updateProjects(dataDetails._id, dataNewProjects, setUpdate));

  };
  const handleChange = dataSelect => {
    if (projectStatus.length > 0) setProjectStatus([dataSelect[1]]);
  };
  return (
    <div className="w-10/12 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100  py-4">
        <form onSubmit={handleSubmit(handleOnSubmitEdit)} className="w-full">
          <div className="px-10">
            <div className="my-8">
              <div className="pb-6 md:pb-0 flex flex-col">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Name
                </label>
                <div>
                  <div className="flex-1 leading-none">
                    <input
                      ref={dataForm}
                      defaultValue={dataDetails?.name}
                      type="text"
                      className="w-3/4 sm:w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      name="name"
                      placeholder="name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-8">
              <div className="pb-6 md:pb-0 flex flex-col">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Description
                </label>
                <div>
                  <div className="flex-1 leading-none">
                    <textarea
                      ref={dataForm}
                      defaultValue={dataDetails?.description}
                      type="text"
                      className="w-3/4 sm:w-full outline-none px-5  py-4 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      name="description"
                      placeholder="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4 flex sm:flex-col sm:w-full">
              <div className="w-2/4 mr-2 sm:w-full">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Project Type
                </label>
                <div className="mt-2">
                  <MultiSelect
                    isLoading={loadingProjectType}
                    labelledBy={"Select"}
                    onChange={setProjectType}
                    value={projectType}
                    options={addDisabled(dataProjectType)}
                  />
                </div>
              </div>
              <div className="w-2/4 sm:w-full sm:mt-5">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Customers
                </label>
                <div className="mt-2">
                  <MultiSelect
                    isLoading={loadingCustomers}
                    onChange={setCustomers}
                    value={customers}
                    options={addDisabled(dataCustomers)}
                  />
                </div>
              </div>
            </div>
            <div className="w-3/4 flex sm:flex-col mt-5 sm:w-full">
              <div className="w-2/4 mr-2 sm:w-full">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Tech Stack
                </label>
                <div className="mt-2">
                  <MultiSelect
                    isLoading={loadingTechStack}
                    onChange={setTechStack}
                    value={techStack}
                    options={addDisabled(dataTechStack)}
                  />
                </div>
              </div>
              <div className="w-2/4 sm:w-full sm:mt-5">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Staffs
                </label>
                <div className="mt-2">
                  <MultiSelect
                    isLoading={loadingStaff}
                    onChange={setStaffs}
                    value={staffs}
                    options={addDisabled(dataStaffs)}
                  />
                </div>
              </div>
            </div>
            <div className="w-3/4 flex sm:flex-col mt-5 sm:w-full">
              <div className="w-2/4 mr-2 sm:w-full">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Department
                </label>
                <div className="mt-2">
                  <MultiSelect
                    isLoading={loadingDepartments}
                    onChange={setDepartments}
                    value={departments}
                    options={addDisabled(dataDepartment)}
                  />
                </div>
              </div>
              <div className="w-2/4 sm:w-full sm:mt-5">
                <label htmlFor="name" className="input-label text-base mb-2">
                  Project Status
                </label>
                <div className="mt-2">
                  <MultiSelect
                    hasSelectAll={false}
                    isLoading={loadingProjectStatus}
                    onChange={handleChange}
                    value={projectStatus}
                    options={addDisabled(dataProjectStatus)}
                  />
                </div>
              </div>
            </div>
            <div className=" py-4 flex justify-end sm:justify-center">
              <button
                onClick={() => setUpdate(false)}
                className="border font-medium border-red-500 bg-red-500 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
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
