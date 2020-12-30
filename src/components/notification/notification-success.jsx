import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export const NotificationSuccess = () => {
  const refNotification = useRef(null);
  const { link } = useSelector(state => state.status);
  const history = useHistory();
  const timeoutRedirect = 3000;
  const timeoutTransition = 2000;

  useEffect(() => {
    if (link === null) return;
    const setTimeoutRedirect = setTimeout(() => {
      history.push(link);
    }, timeoutRedirect);
    return () => {
      clearTimeout(setTimeoutRedirect);
    };
  }, [link]);
  useEffect(() => {
    const styleElement = refNotification.current.style;
    const timeOutBegin = setTimeout(() => {
      styleElement.transition = "all 0.7s ease-in-out";
      styleElement.opacity = "1";
      styleElement.right = "0";
    }, 100);
    const timeOut = setTimeout(() => {
      styleElement.transition = "all 1s ease-in-out";
      styleElement.opacity = "0";
      styleElement.transform = "translateX(500px)";
    }, timeoutTransition);
    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOutBegin);
    };
  }, []);
  const handleRemoveNotification = () => {
    const styleElement = refNotification.current.style;
    styleElement.transition = "all 0.2s ease-in-out";
    styleElement.transform = "translateX(-50px)";
    setTimeout(() => {
      styleElement.transition = "all 0.5s ease-in-out";
      styleElement.transform = "translateX(500px)";
      styleElement.opacity = "0";
    }, 200);
  };
  return (
    <div
      onClick={handleRemoveNotification}
      ref={refNotification}
      className="w-1/5 sm:w-3/5 lg:w-2/5 fixed -right-52 opacity-0 cursor-pointer top-20  hover:bg-green-400 bg-green-500 border-r-8 shadow-lg border-green-800 text-green-dark p-6"
      role="alert"
    >
      <p className="font-semibold tracking-widest text-lg text-white">SUCCESS!</p>
    </div>
  );
};
