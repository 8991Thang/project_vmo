import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { setLinkRedirect } from "../../../app/statusReducers";
import { TitlePage } from "../../../components/title-page/title-page";
import {
  getDataCreateDepartment,
  sendingRequestNewDepartmentFromApi,
} from "../../departments/departments.services";
import { INACTIVE } from "../departments.constants";
export const FormCreateDepartments = () => {
  const dispatch = useDispatch();

  const { register: dataForm, handleSubmit } = useForm();

  const { loading: loadingStaffs } = useSelector(state => state.staffs);
  const { loading: loadingProjects } = useSelector(state => state.projects);
  const { loading: loadingTechStacks } = useSelector(state => state.techStack);

  const { link: linkNewDepertment } = useSelector(state => state.departments);

  const listStaff = useSelector(state => state.staffs.data);
  const listProject = useSelector(state => state.projects.dataProjects.record);
  const listTechStack = useSelector(state => state.techStack.data);

  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);


  useEffect(() => {
    dispatch(getDataCreateDepartment());
  }, []);

  useEffect(() => {
    dispatch(setLinkRedirect(linkNewDepertment));
  }, [linkNewDepertment]);

  const onSubmit = async data => {
    const dataRequest = {
      name: data.name.trim(),
      description: data.description.trim(),
      techStacksId: selectedTechStacks.map(item => item.value),
      projectsId: selectedProject.map(item => item.value),
      staffsId: selectedStaffs.map(item => item.value),
    };
    await dispatch(sendingRequestNewDepartmentFromApi(dataRequest));
  };

  const addDisabled = (arr = []) => {
    return arr.map(item => {
      if (item.status === INACTIVE) {
        return { label: item.name, value: item._id, disabled: true };
      }
      return { label: item.name, value: item._id };
    });
  };

  return (
    <div className="mt-10">
      <TitlePage content="ADD Department " />
      <div className="flex justify-center">
        <div className="leading-loose w-6/12 sm: w-full">
          <form className=" m-4 p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-gray-800 font-medium mb-5">Departments information.</p>
            <div>
              <label className="block text-sm text-gray-600 mb-2" htmlFor="name">
                Name<span className="text-red-600">*</span>
              </label>
              <input
                ref={dataForm}
                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="description">
                Description<span className="text-red-600">*</span>
              </label>
              <textarea
                ref={dataForm}
                className="w-full outline-none px-5  py-4 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="description"
                name="description"
                type="text"
                required
                placeholder="Description"
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="techStack">
                Select tech stacks
              </label>
              <MultiSelect
                isLoading={loadingTechStacks}
                options={addDisabled(listTechStack)}
                value={selectedTechStacks}
                onChange={setSelectedTechStacks}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="staff">
                Select staffs
              </label>
              <MultiSelect
                isLoading={loadingStaffs}
                options={addDisabled(listStaff)}
                value={selectedStaffs}
                onChange={setSelectedStaffs}
                labelledBy={"Select"}
              />
            </div>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="projectType">
                Select projects
              </label>
              <MultiSelect
                isLoading={loadingProjects}
                options={addDisabled(listProject)}
                value={selectedProject}
                onChange={setSelectedProject}
                labelledBy={"Select"}
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <div className="m-3">
                <button
                  style={{ outline: "none" }}
                  className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 flex items-center"
                >
                  <span className="mr-1">Add</span>
                  <BsPlus className="text-xl font-bold " />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
