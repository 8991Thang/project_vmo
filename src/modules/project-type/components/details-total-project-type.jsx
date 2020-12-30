import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../../../api/api";
import { Loading } from "../../../components/loading/loading";
import { REACT_APP_API_SERVER_PROJECT_TYPE } from "../../../constants/constants";
import { FormDetailProjectType } from "./form-detail-project-type";
import { FormEditProjectType } from "./form-edit-project-type";
export const DetailsProjectType = () => {
  const [update, setUpdate] = useState(false);
  const [isEditingDone, setIsEditingDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailsProjectType, setDataDetailsProjectType] = useState([]);
  const params = useParams();
  useEffect(() => {
    getDataDetailsProjectType();
  }, [isEditingDone]);
  const getDataDetailsProjectType = async () => {
    setLoading(true);
    const apiProjectType = `${REACT_APP_API_SERVER_PROJECT_TYPE}/${params.id}`;
    try {
      const respon = await apiGet(apiProjectType);
      const { data } = respon.data;
      setDataDetailsProjectType(data.record);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="sm:flex sm:justify-center">
          {update ? (
            <FormEditProjectType
              dataDetails={detailsProjectType}
              setUpdate={setUpdate}
              setIsEditingDone={setIsEditingDone}
              isEditingDone={isEditingDone}
            />
          ) : (
            <FormDetailProjectType setUpdate={setUpdate} dataDetails={detailsProjectType} />
          )}
        </div>
      )}
    </div>
  );
};
