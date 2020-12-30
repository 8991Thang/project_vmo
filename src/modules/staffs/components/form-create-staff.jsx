import { useEffect, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useOutsideClick } from "../../../utils/use-outside-click";
import { TitlePage } from "../../../components/title-page/title-page";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MultiSelect from "react-multi-select-component";
import { createNewStaffFromApi } from "../staffs.services";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setLinkRedirect } from "../../../app/statusReducers";
import { getListTechStack } from "../../../services/tech-stack.services";
import { getRoleStaffsStatus } from "../../../services/roles";
import { BiChevronDown } from "react-icons/bi";
import { Loading } from "../../../components/loading/loading";
import { FRESHER, JUNIOR, SENIOR } from "../../../constants/constants";

export const FormCreateStaff = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.staffs);
  const { data: techStacks } = useSelector(state => state.techStack);
  const { roles } = useSelector(state => state.staffs);
  const { loading: loadingTechStacks } = useSelector(state => state.techStack);
  const { link } = useSelector(state => state.staffs);

  const selectLevelSkill = useRef(null);
  const selectLanguages = useRef(null);
  const selectCertificate = useRef(null);

  const [certs, setCerts] = useState([]);
  const [cert, setCert] = useState("");

  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");

  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [skills, setSkills] = useState([]);


  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [isShowTechStacks, setIsShowTechStacks] = useState(false);
  const [isShowLanguages, setIsShowLanguages] = useState(false);
  const [isShowCerts, setIsShowCerts] = useState(false);
  const { register: dataForm, handleSubmit } = useForm();

  useOutsideClick(selectLevelSkill, () => {
    setIsShowTechStacks(false);
  });
  useOutsideClick(selectLanguages, () => {
    setIsShowLanguages(false);
  });
  useOutsideClick(selectCertificate, () => {
    setIsShowCerts(false);
  });


  useEffect(() => {
    dispatch(getListTechStack());
    dispatch(getRoleStaffsStatus());
  }, []);

  useEffect(() => {
    dispatch(setLinkRedirect(link));
  }, [link]);

  useEffect(() => {
    const newSkills = selectedTechStacks.map(techStack => {
      return { techStackId: techStack.value, level: FRESHER, label: techStack.label };
    });
    setSkills(newSkills);
  }, [selectedTechStacks]);

  const onSubmit = async data => {
    let listSkill = [...skills];
    const date = new Intl.DateTimeFormat(["en-US"]).format(dateOfBirth);
    listSkill = listSkill.map(item => {
      return { techStackId: item.techStackId, level: item.level };
    });
    const newData = { ...data, languages, certs, dob: date, skills: listSkill };
    await dispatch(createNewStaffFromApi(newData));
  };
  const addDisabled = (arr = []) => {
    return arr.map(item => {
      return { label: item.name, value: item._id };
    });
  };

  const changeLevel = (e, id) => {
    const newArr = [...skills];
    const techStack = newArr.find(item => item.techStackId === id);
    techStack.level = e.target.value;
    setSkills(newArr);
  };

  const addLanguages = () => {
    setIsShowLanguages(true);
    if (language.length > 0) {
      setLanguages([...languages, language]);
    }
    setLanguage("");
  };

  const addCert = () => {
    setIsShowCerts(true);
    if (cert.length > 0) {
      setCerts([cert, ...certs]);
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
            <TitlePage content="ADD Staff " />
            <div className="flex justify-center">
              <div className="leading-loose w-full">
                <form
                  className=" m-4 p-10 bg-white rounded shadow-xl flex flex-wrap"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <p className="text-gray-800 font-medium mb-5 w-full">Staff information.</p>
                  <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="name">
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
                  <div className="w-1/2 sm:w-full pt-4">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="email">
                      Email<span className="text-red-600">*</span>
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="email"
                      name="email"
                      type="email"
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
                      placeholder="address"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="identityNumber">
                      Identity number<span className="text-red-600">*</span>
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="identityNumber"
                      name="identityNumber"
                      type="text"
                      required
                      placeholder="Identity Number"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4  pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="phoneNumber">
                      Phone number<span className="text-red-600">*</span>
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      required
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="password">
                      Password<span className="text-red-600">*</span>
                    </label>
                    <input
                      ref={dataForm}
                      className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                      id="password"
                      name="password"
                      type="text"
                      required
                      placeholder="Password"
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4  pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 my-2" htmlFor="certs">
                      Certificate
                    </label>
                    <div className="relative"ref={selectCertificate}>
                      <div className="relative" >
                        <input
                          className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                          id="certs"
                          type="text"
                          placeholder="Multi certificate"
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
                        <ul className="absolute right-0 top-11 bg-gray-100 w-full max-h-40   overflow-x-hidden z-10">
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
                    <div className="relative" ref={selectLanguages} >
                      <div className="relative">
                        <input
                          className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                          id="languages"
                          type="text"
                          placeholder="Multi languages"
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
                        <ul className="absolute right-0 top-11 bg-gray-100 w-full max-h-40 overflow-x-hidden z-10">
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

                  <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="identityNumber">
                      Select tech stacks
                    </label>
                    <MultiSelect
                      isLoading={loadingTechStacks}
                      options={addDisabled(techStacks)}
                      value={selectedTechStacks}
                      onChange={setSelectedTechStacks}
                      labelledBy={"Select"}
                    />
                  </div>
                  <div className="w-1/2 sm:w-full pt-4">
                    <label
                      className="block text-sm text-gray-00 mb-2 w-full"
                      htmlFor="identityNumber"
                    >
                      Select level tech stacks
                    </label>
                    <div className="relative"
                      ref={selectLevelSkill}
                    >
                      <div
                        className="border py-1 rounded px-5 "
                        onClick={() => setIsShowTechStacks(!isShowTechStacks)}

                      >
                        <span className="text-gray-700">Select..</span>
                      </div>
                      <BiChevronDown className="absolute top-3 text-gray-500 text-2xl right-3" />
                      <ul
                        className={
                          isShowTechStacks ?
                            "absolute  mt-2 bg-gray-100 w-full max-h-40   overflow-x-hidden z-10" :
                            "hidden"
                        }
                      >
                        {skills.map(item => (
                          <li
                            key={item.techStackId}
                            className="py-2 border-b flex px-2 hover:bg-gray-50"
                          >
                            <span className="flex-1">{item.label}</span>
                            <select
                              value={item.level}
                              className="border rounded"
                              onChange={e => changeLevel(e, item.techStackId)}
                            >
                              <option value={FRESHER} >{FRESHER}</option>
                              <option value={JUNIOR}>{JUNIOR}</option>
                              <option value={SENIOR}>{SENIOR}</option>
                            </select>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>



                  <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
                    <label className="block text-sm text-gray-00 mb-2" htmlFor="address">
                      Select role
                    </label>
                    <div className="relative ">
                      <select
                        ref={dataForm}
                        className="w-full appearance-none outline-none px-3 py-1 text-gray-700 bg-gray-200 rounded"
                        id="role"
                        name="role"
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
                  <div className="w-1/2 sm:w-full pt-4">
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
                        <span className="mr-2">Add</span>
                        <BsPlus className="text-xl font-bold " />
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
