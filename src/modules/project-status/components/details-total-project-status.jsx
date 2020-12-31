import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../../../api/api";
import { Loading } from "../../../components/loading/loading";
import { REACT_APP_API_SERVER_PROJECT_STATUS } from "../../../constants/constants";
import { FormDetailProjectStatus } from "./form-detail-project-status";
import { FormEditProjectStatus } from "./form-edit-project-status";
export const DetailsProjectStatus = () => {
  const [loading, setLoading] = useState(false);
  const [detailsProjectStatus, setDataDetailsProjectStatus] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsProjectStatus = async () => {
      setLoading(true);
      const apiProjectStatus = `${REACT_APP_API_SERVER_PROJECT_STATUS}/${params.id}`;
      try {
        const respon = await apiGet(apiProjectStatus);
        const { data } = respon.data;
        setDataDetailsProjectStatus(data.record);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
      }
    };
    getDataDetailsProjectStatus();
  }, [update]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {editStatus ? (
            <FormEditProjectStatus
              projectStatusDetails={detailsProjectStatus}
              setEditStatus={setEditStatus}
              setUpdate={setUpdate}
              update={update}
            />
          ) : (
            <FormDetailProjectStatus
              setEditStatus={setEditStatus}
              projectStatusDetails={detailsProjectStatus}
            />
          )}
        </div>
      )}
    </div>
  );
};
