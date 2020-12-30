import loadingImage from "../../assets/image/22.gif";
export const LoadingSmallSize = ({ size = 10 }) => {
  return (
    <div className={"flex items-center" + " " + "h-" + size}>
      <img className="w-12" src={loadingImage} alt="loading" />
    </div>
  );
};
