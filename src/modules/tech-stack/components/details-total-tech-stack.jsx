import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../../../api/api";
import { Loading } from "../../../components/loading/loading";
import { REACT_APP_API_SERVER_TECH_STACK } from "../../../constants/constants";
import { FormDetailTechStack } from "./form-detail-tech-stack";
import { FormEditTechStack } from "./form-edit-tech-stack";
export const DetailsTeckStack = () => {
  const [isEditingDone, setIsEditingDone] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailsTechStack, setDataDetailsTechStack] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsTechStack = async () => {
      setLoading(true);
      const apiProjectStatus = `${REACT_APP_API_SERVER_TECH_STACK}/${params.id}`;
      try {
        const respon = await apiGet(apiProjectStatus);
        const { data } = respon.data;
        setDataDetailsTechStack(data.record);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
      }
    };
    getDataDetailsTechStack();
  }, [isEditingDone]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {update ? (
            <FormEditTechStack
              detailsTeckStack={detailsTechStack}
              setIsEditingDone={setIsEditingDone}
              setUpdate={setUpdate}
              isEditingDone={isEditingDone}
            />
          ) : (
            <FormDetailTechStack setUpdate={setUpdate} detailsTeckStack={detailsTechStack} />
          )}
        </div>
      )}
    </div>
  );
};
