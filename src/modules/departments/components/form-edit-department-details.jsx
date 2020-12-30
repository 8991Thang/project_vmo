import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { getDataCreateDepartment } from "../../departments/departments.services";
import { INACTIVE } from "../departments.constants";

export const FormEditDepartmentDetails = ({ onSubmit, setUpdate }) => {
  const dispatch = useDispatch();

  const listStaff = useSelector(state => state.staffs.data);
  const listProject = useSelector(state => state.projects.dataProjects.record);
  const listTechStack = useSelector(state => state.techStack.data);

  const { dataDetails } = useSelector(state => state.departments);

  const { loading: loadingStaffs } = useSelector(state => state.staffs);
  const { loading: loadingProjects } = useSelector(state => state.projects);
  const { loading: loadingTechStacks } = useSelector(state => state.techStack);

  const { staffsId: valueStaffs } = useSelector(state => state.departments.dataDetails);
  const { projectsId: valueProjects } = useSelector(state => state.departments.dataDetails);
  const { techStacksId: valueTechStacks } = useSelector(state => state.departments.dataDetails);

  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);

  const addDisabled = arr => {
    return arr.map(item => {
      if (item.status === INACTIVE) {
        return { label: item.name, value: item._id, disabled: true };
      }
      return { label: item.name, value: item._id };
    });
  };

  useEffect(() => {
    setSelectedStaffs(addDisabled(valueStaffs));
    setSelectedProjects(addDisabled(valueProjects));
    setSelectedTechStacks(addDisabled(valueTechStacks));
    dispatch(getDataCreateDepartment());
  }, []);

  const { register: dataForm, handleSubmit } = useForm();

  const submitForm = data => {
    let newData = {
      update: {
        staffsId: selectedStaffs.map(item => item.value),
        techStacksId: selectedTechStacks.map(item => item.value),
        projectsId: selectedProjects.map(item => item.value),
      },
    };
    if (data.name !== dataDetails.name) {
      newData = { update: { ...newData.update, name: data.name.trim() }};
    }
    if (data.description !== dataDetails.description) {
      newData = {
        update: { ...newData.update, description: data.description.trim() },
      };
    }
    onSubmit(newData);
  };

  return (
    <div className="w-10/12 rounded-lg shadow-lg bg-white mt-10 ml-5 sm:ml-0">
      <div className="flex justify-between border-b border-gray-100  py-4">
        <form onSubmit={handleSubmit(submitForm)} className="w-full">
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
                      id="name"
                      defaultValue={dataDetails.name}
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
                <label htmlFor="description" className="input-label text-base mb-2">
                  Description
                </label>
                <div>
                  <div className="flex-1 leading-none">
                    <textarea
                      ref={dataForm}
                      id="description"
                      defaultValue={dataDetails.description}
                      type="text"
                      className="w-3/4 sm:w-full  outline-none px-5  py-4 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      name="description"
                      placeholder="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4 sm:w-full ">
              <div className="inline-block mt-2 w-full pr-1">
                <label className="text-sm text-gray-600 mb-2">Tech stacks</label>
                <MultiSelect
                  isLoading={loadingTechStacks}
                  options={addDisabled(listTechStack)}
                  value={selectedTechStacks}
                  onChange={setSelectedTechStacks}
                  labelledBy={"Select"}
                />
              </div>
            </div>
            <div className="w-3/4 sm:w-full ">
              <div className="inline-block mt-2 w-full pr-1">
                <label className="text-sm text-gray-600 mb-2">Projects</label>
                <MultiSelect
                  isLoading={loadingProjects}
                  options={addDisabled(listProject)}
                  value={selectedProjects}
                  onChange={setSelectedProjects}
                  labelledBy={"Select"}
                />
              </div>
            </div>
            <div className="w-3/4 sm:w-full ">
              <div className="inline-block mt-2 w-full pr-1">
                <label className="text-sm text-gray-600 mb-2">Staffs</label>
                <MultiSelect
                  isLoading={loadingStaffs}
                  options={addDisabled(listStaff)}
                  value={selectedStaffs}
                  onChange={setSelectedStaffs}
                  labelledBy={"Select"}
                />
              </div>
            </div>
            <div className=" py-4 flex justify-center">
              <button
                onClick={() => setUpdate(false)}
                className="border border-red-500 bg-red-500 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
              >
                CANCEL
              </button>
              <button
                type="sumbit"
                className="border border-green-700 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
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
