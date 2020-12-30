import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/loading/loading";
import { getDetailsProjectStatus } from "../project-status.services";
import { FormDetailProjectStatus } from "./form-detail-project-status";
import { FormEditProjectStatus } from "./form-edit-project-status";
export const DetailsProjectStatus = () => {
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const { projectStatusDetails } = useSelector(state => state.projectStatus);
  const { loading } = useSelector(state => state.projectStatus);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getDetailsProjectStatus(params.id));
  }, [update]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {editStatus ? (
            <FormEditProjectStatus
              projectStatusDetails={projectStatusDetails.record}
              setEditStatus={setEditStatus}
              setUpdate={setUpdate}
              update={update}
            />
          ) : (
            <FormDetailProjectStatus
              setEditStatus={setEditStatus}
              projectStatusDetails={projectStatusDetails.record}
            />
          )}
        </div>
      )}
    </div>
  );
};
