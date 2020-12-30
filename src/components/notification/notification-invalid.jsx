import { useEffect, useRef } from "react";
export const NotificationInvalid = () => {
  const refNotification = useRef(null);
  const timeoutTransition = 2000;
  useEffect(() => {
    const styleElement = refNotification.current.style;
    const timeOutBegin = setTimeout(() => {
      styleElement.transition = "all 0.7s ease-in-out";
      styleElement.opacity = "1";
      styleElement.right = "1px";
    }, 100);
    const timeOut = setTimeout(() => {
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
      className="w-1/5 sm:w-3/5 fixed lg:w-2/5 -right-52 opacity-0  cursor-pointer top-20  hover:bg-yellow-500 bg-yellow-400 border-r-8 shadow-lg border-yellow-700 p-6"
      role="alert"
    >
      <p className="font-semibold tracking-widest text-lg text-white">Invalid!</p>
    </div>
  );
};
