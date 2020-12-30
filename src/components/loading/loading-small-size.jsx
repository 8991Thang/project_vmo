import loadingImage from "../../assets/image/22.gif";
export const LoadingSmallSize = () => {
  return (
    <div className=" h-10 flex items-center">
      <img className="w-10" src={loadingImage} alt="loading" />
    </div>
  );
};
