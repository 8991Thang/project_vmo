import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetStatus } from "../../app/statusReducers";
import { FcInfo } from "react-icons/fc";
export const ModalWarning = () => {
  const refModalWarning = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const styleElement = refModalWarning.current.style;
    styleElement.trasistion = "all 0.5s ease-in-out";
    styleElement.opacity = "1";
    return () => {
      dispatch(resetStatus());
    };
  }, []);
  return (
    <div
      ref={refModalWarning}
      className="bg-white lg:w-2/5 sm:w-4/5 w-1/5 fixed opacity-0 top-2/4 left-2/4 shadow-lg -translate-x-2/4 -translate-y-2/4 transform rounded-lg"
    >
      <div className="w-full border-t-8 border-indigo-600 rounded-lg flex">
        <div className="w-1/3 pt-11 pl-5 flex justify-center">
          <FcInfo className="text-4xl" />
        </div>
        <div className="w-full pl-10 pt-9">
          <h3 className="font-bold tracking-wider text-indigo-700">Unauthorized!</h3>
          <p className="py-4 text-sm text-gray-400">Please login again.</p>
        </div>
      </div>
      <div className="p-4 flex justify-end">
        <Link
          to="/login"
          href="#"
          className="w-2/5 px-3 py-3 text-center text-indigo-100 bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:text-white font-bold text-sm"
        >
          OKE
        </Link>
      </div>
    </div>
  );
};
