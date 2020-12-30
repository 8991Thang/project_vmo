import { useEffect, useRef, useState } from "react";
import { TitlePage } from "../../../components/title-page/title-page";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "react-multi-select-component";
import { useOutsideClick } from "../../../utils/use-outside-click";
import { useForm } from "react-hook-form";
import { updateStaff } from "../staffs.services";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiChevronDown } from "react-icons/bi";
import { Loading } from "../../../components/loading/loading";

export const FormEditStaff = ({ setUpdate }) => {
  const dispatch = useDispatch();

  const selectLevelSkill = useRef(null);
  const selectLanguages = useRef(null);
  const selectCertificate = useRef(null);

  const { staffInfoRecord } = useSelector(state => state.staffs.dataDetail);
  const { staffExpRecord } = useSelector(state => state.staffs.dataDetail);

  const [certs, setCerts] = useState(staffInfoRecord.certs);
  const [cert, setCert] = useState("");
  const [languages, setLanguages] = useState(staffInfoRecord.languages);
  const [language, setLanguage] = useState("");
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [skills, setSkills] = useState([]);
  const { roles } = useSelector(state => state.staffs);
  const [role, setRole] = useState("");


  const [dateOfBirth, setDateOfBirth] = useState(new Date(staffInfoRecord.dob));
  const { loading } = useSelector(state => state.staffs);
  // const [isShowTechStacks, setIsShowTechStacks] = useState(false);
  const [isShowLevelTechStacks, setIsShowLevelTechStacks] = useState(false);
  const [isShowLanguages, setIsShowLanguages] = useState(false);
  const [isShowCerts, setIsShowCerts] = useState(false);

  const { register: dataForm, handleSubmit } = useForm();
  const { data: techStacks } = useSelector(state => state.techStack);
  const { loading: loadingTechStacks } = useSelector(state => state.techStack);

  useOutsideClick(selectLevelSkill, () => {
    setIsShowLevelTechStacks(false);
  });
  useOutsideClick(selectLanguages, () => {
    setIsShowLanguages(false);
  });
  useOutsideClick(selectCertificate, () => {
    setIsShowCerts(false);
  });

  useEffect(() => {
    setRole(staffInfoRecord.role);
    setSelectedTechStacks(changeDefaultValue(staffExpRecord.skills));
    setSkills(staffExpRecord.skills);
  }, []);

  useEffect(() => {
    let newArr = [...selectedTechStacks];
    newArr = newArr.map(item => {
      const itemTechStaff = skills.find(itemSkill => itemSkill.techStackId._id === item.value);
      if (itemTechStaff === undefined) {
        return { level: "fresher", techStackId: { _id: item.value, name: item.label }};
      }
      return { level: itemTechStaff.level, techStackId: { _id: item.value, name: item.label }};

    });
    setSkills(newArr);
  }, [selectedTechStacks]);

  const changeArr = (arr = []) => {
    return arr.map(item => {
      return { label: item.name, value: item._id };
    });
  };

  const changeDefaultValue = (arr = []) => {
    return arr.map(item => {
      return { label: item.techStackId.name, value: item.techStackId._id };
    });
  };

  const onSubmit = dataStaff => {
    let newData = { dob: dateOfBirth };
    if (dataStaff.name !== staffInfoRecord.name) {
      newData = { ...newData, name: dataStaff.name };
    }
    if (dataStaff.email !== staffInfoRecord.email) {
      newData = { ...newData, email: dataStaff.email };
    }
    if (dataStaff.address !== staffInfoRecord.address) {
      newData = { ...newData, address: dataStaff.address };
    }
    if (dataStaff.identityNumber !== staffInfoRecord.identityNumber) {
      newData = { ...newData, identityNumber: dataStaff.identityNumber };
    }
    if (dataStaff.phoneNumber === staffInfoRecord.phoneNumber) {
      newData = { ...newData, phoneNumber: dataStaff.phoneNumber };
    }
    if (dataStaff.role !== staffInfoRecord.role) {
      newData = { ...newData, role: dataStaff.role };
    }
    newData = { ...newData, certs, languages };
    const newSkills = skills.map(item => {
      return { techStackId: item.techStackId._id, level: item.level };
    });
    dispatch(updateStaff(newData, staffInfoRecord._id, setUpdate));
    dispatch(updateStaff({ skills: newSkills }, staffInfoRecord._id + "/exp", setUpdate));
  };

  const changeLevel = (e, id) => {
    let newArr = [...skills];

    newArr = newArr.map(item => {
      if (item.techStackId._id === id) {
        return { ...item, level: e.target.value };
      }
      return item;
    });
    setSkills(newArr);
  };

  const addLanguages = () => {
    setIsShowLanguages(true);
    if (language.length > 0) {
      setLanguages([...languages, language]);
    }
    else {
      setIsShowLanguages(!isShowLanguages);
    }
    setLanguage("");
  };

  const addCert = () => {
    setIsShowCerts(true);
    if (cert.length > 0) {
      setCerts([...certs, cert]);
    }
    else {
      setIsShowCerts(!isShowCerts);
    }
    setCert("");
  };

  const removeLanguage = indexLanguage => {
    const newArr = [...languages];
    newArr.splice(indexLanguage, 1);
    setLanguages(newArr);
  };

  const removCert = indexCerts => {
    const newArr = [...certs];
    newArr.splice(indexCerts, 1);
    setCerts(newArr);
  };

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="mt-10">
            <TitlePage content="Edit Staff " />
            <div className="flex justify-center">
              <div className="leading-loose w-full">
                <form
                  className=" m-4 p-10 bg-white rounded shadow-xl flex flex-wrap"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className="text-gray-800 font-medium mb-5 w-full">Staff information.</p>
                  <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={staffInfoRecord.name}
                      required
                      placeholder="Name"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={staffInfoRecord.email}
                      required
                      placeholder="email"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="address">
                      Address
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="address"
                      name="address"
                      type="text"
                      defaultValue={staffInfoRecord.address}
                      placeholder="address"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="identityNumber">
                      Identity number
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="identityNumber"
                      name="identityNumber"
                      type="text"
                      required
                      defaultValue={staffInfoRecord.identityNumber}
                      placeholder="Identity Number"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4  pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 my-2" htmlFor="certs">
                      Certificate
                    </label>
                    <div className="relative" ref={selectCertificate}>
                      <div className="relative">
                        <input
                          className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                          id="certs"
                          type="text"
                          placeholder="Certificate"
                          value={cert}
                          onChange={e => setCert(e.target.value)}
                          onFocus={() => setIsShowCerts(true)}
                          onKeyPress={e => {
                            if (e.key === "Enter" && cert) {
                              e.preventDefault();
                              addCert();
                            }
                          }}
                        />
                      </div>
                      {isShowCerts && (
                        <ul className="absolute right-0 top-10 bg-gray-100 w-full max-h-40   overflow-x-hidden z-10">
                          {certs.map((item, index) => (
                            <li
                              key={index}
                              className="flex py-2 border-b flex px-2 hover:bg-gray-50"
                            >
                              <span className="flex-1">{item}</span>
                              <div
                                onClick={() => removCert(index)}
                                className="cursor-pointer w-10 text-center  bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                              >
                                X
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 sm:w-full pt-4">
                    <label className="block text-sm text-gray-00 my-2" htmlFor="languages">
                      Languages
                    </label>
                    <div className="relative" ref={selectLanguages}>
                      <div className="relative">
                        <input
                          className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                          id="languages"
                          type="text"
                          placeholder="Languages"
                          value={language}
                          onChange={e => setLanguage(e.target.value)}
                          onFocus={() => setIsShowLanguages(true)}
                          onKeyPress={e => {
                            if (e.key === "Enter" && language) {
                              e.preventDefault();
                              addLanguages();
                            }
                          }}
                        />
                      </div>
                      {isShowLanguages && (
                        <ul className="absolute right-0 top-10 bg-gray-100 w-full max-h-40   overflow-x-hidden z-10">
                          {languages.map((item, index) => (
                            <li
                              key={index}
                              className="flex py-2 border-b flex px-2 hover:bg-gray-50"
                            >
                              <span className="flex-1">{item}</span>
                              <div
                                onClick={() => removeLanguage(index)}
                                className="cursor-pointer w-10 text-center  bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                              >
                                X
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 sm:w-full pt-4  pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="phoneNumber">
                      Phone number
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      required
                      defaultValue={staffInfoRecord.phoneNumber}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4 ">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="address">
                      Select role
                    </label>
                    <div className="relative ">
                      <select
                        // ref={dataForm}
                        className="w-full appearance-none outline-none px-3 py-1 text-gray-700 border rounded"
                        id="role"
                        name="role"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                      >
                        {roles.map(role => (
                          <option key={role._id} value={role._id}>
                            {role.roleName}
                          </option>
                        ))}
                      </select>
                      <BiChevronDown className="absolute top-2 text-gray-500 text-2xl right-3" />
                    </div>
                  </div>



                  <div className="w-1/2 sm:w-full pr-4 sm:pr-0">
                    <div className="inline-block mt-2 w-full pr-1">
                      <label className="text-sm text-gray-00 mb-2">Select tech stacks</label>
                      <MultiSelect
                        isLoading={loadingTechStacks}
                        options={changeArr(techStacks)}
                        value={selectedTechStacks}
                        onChange={setSelectedTechStacks}
                        labelledBy={"Select"}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 sm:w-full pt-4">
                    <label
                      className="block text-sm text-gray-00 mb-2 w-full"
                      htmlFor="identityNumber"
                    >
                      Select level tech stacks
                    </label>
                    <div className="relative" ref={selectLevelSkill}>
                      <div
                        className="border py-1 rounded px-5 "
                        onClick={() => setIsShowLevelTechStacks(!isShowLevelTechStacks)}
                      >
                        <span className="text-gray-700">Select..</span>
                      </div>
                      <BiChevronDown className="absolute top-3 text-gray-500 text-2xl right-3" />
                      <ul
                        className={
                          isShowLevelTechStacks ?
                            "absolute  mt-2 bg-gray-100 w-full max-h-40   overflow-x-hidden z-10" :
                            "hidden"
                        }
                      >
                        {skills.map(item => (
                          <li
                            key={item.techStackId._id}
                            className="py-2 border-b flex px-2 hover:bg-gray-50"
                          >
                            <span className="flex-1">{item.techStackId.name}</span>
                            <select
                              value={item.level}
                              className="border rounded"
                              onChange={e => changeLevel(e, item.techStackId._id)}
                            >
                              <option value="fresher">fresher</option>
                              <option value="junior">junior</option>
                              <option value="senior">senior</option>
                            </select>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="w-full pt-4">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="address">
                      Date of birth
                    </label>
                    <DatePicker
                      className="bg-gray-200 px-5 py-1"
                      selected={dateOfBirth}
                      onChange={date => setDateOfBirth(date)}
                    />
                  </div>
                  <div className="ml-auto mr-auto sm:mt-4">
                    <div className="m-3">
                      <button className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <span className="mr-2">Save</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
