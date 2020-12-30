import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { BsPlus } from "react-icons/bs";
import { TitlePage } from "../../../components/title-page/title-page";
// import { Link,
//   // , useHistory
// } from "react-router-dom";
import { setLinkRedirect } from "../../../app/statusReducers";

// import { Loading } from "../../../components/loading/loading";
// import { notifyUpdate } from "../../../utils/notifications-when-update";
// import { resetStatusProjects } from "../projects.actions";
import { createProjects, getDaTaTotal,
  //  resetStatusTotal
} from "../projects.services";

const addDisabled = (arr = []) => {
  return arr.map(item => {
    if (item.status === "inactive") {
      return { label: item.name, value: item._id, disabled: true };
    }
    return { label: item.name, value: item._id };
  });
};

export const FormCreateProjects = () => {
  const dataProjectType = useSelector(state => state.projectType.data);
  // const { status } = useSelector(state => state.projects);
  // const { loading } = useSelector(state => state.projects);

  const dataCustomers = useSelector(state => state.customers.data);
  const dataTechStack = useSelector(state => state.techStack.data);

  const dataStaffs = useSelector(state => state.staffs.data);
  const dataProjectStatus = useSelector(state => state.projectStatus.data);
  const dataDepartment = useSelector(state => state.departments.data);


  const { loading: loadingProjectType } = useSelector(state => state.projectType);
  const { loading: loadingCustomers } = useSelector(state => state.customers);
  const { loading: loadingTechStack } = useSelector(state => state.techStack);
  const { link: linkNewProject } = useSelector(state => state.projects);

  const { loading: loadingStaff } = useSelector(state => state.staffs);
  const { loading: loadingProjectStatus } = useSelector(state => state.staffs);
  const { loading: loadingDepartments } = useSelector(state => state.departments);

  const [projectType, setProjectType] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [techStack, setTechStack] = useState([]);

  const [staffs, setStaffs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const dispatch = useDispatch();

  // const history = useHistory();
  const { register: dataForm, handleSubmit } = useForm();
  useEffect(() => {
    dispatch(getDaTaTotal());
  }, []);

  useEffect(() => {
    dispatch(setLinkRedirect(linkNewProject));
  }, [linkNewProject]);
  const handleChange = dataSelect => {
    setProjectStatus([dataSelect[0]]);
    if (projectStatus.length > 0) setProjectStatus([dataSelect[1]]);
  };
  const handleOnSubmit = dataForm => {
    if (!projectStatus[0]) return;
    const dataNewProject = {
      ...dataForm,
      techStacksId: techStack.map(item => item.value),
      projectTypesId: projectType.map(item => item.value),
      departmentsId: departments.map(item => item.value),
      staffsId: staffs.map(item => item.value),
      customersId: customers.map(item => item.value),
      projectStatusId: projectStatus[0].value,
    };
    dispatch(createProjects(dataNewProject));
  };

  return (
    <div className="mt-10">
      <TitlePage content="ADD Project " />
      <div className="sm:flex sm:justify-center">
        <div className="w-10/12 rounded-lg shadow-lg bg-white mt-10 ml-5 sm:ml-0 sm:w-11/12">
          <div className="flex justify-between border-b border-gray-100  py-4">
            <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full">
              <div className="px-10">
                <p className="text-gray-800 font-medium mb-5">Project information.</p>
                <div className="my-8">
                  <div className="pb-6 md:pb-0 flex flex-col">
                    <label htmlFor="name" className="input-label text-base mb-2">
                      Name
                    </label>
                    <div>
                      <div className="flex-1 leading-none">
                        <input
                          ref={dataForm}
                          type="text"
                          required
                          className="w-3/4 sm:w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                          name="name"
                          placeholder="Name"
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
                          type="text"
                          required
                          className="w-3/4 sm:w-full outline-none px-5  py-4 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                          name="description"
                          placeholder="description"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-3/4 flex sm:w-full sm:flex-col">
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
                <div className="w-3/4 flex mt-5 sm:w-full sm:flex-col">
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
                <div className="w-3/4 flex mt-5 sm:w-full sm:flex-col">
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
                <div className="flex items-center justify-center mt-6">
                  <div className="m-3">
                    <button
                      type="sumbit"
                      className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 flex items-center"
                    >
                      <span className="mr-1">Add</span>
                      <BsPlus className="text-xl font-bold " />
                    </button>
                  </div>
                </div>


              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
