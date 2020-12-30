import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/loading/loading";
import { getDetailsProjectType } from "../project-type.services";
import { FormDetailProjectType } from "./form-detail-project-type";
import { FormEditProjectType } from "./form-edit-project-type";
export const DetailsProjectType = () => {
  const [update, setUpdate] = useState(false);
  const [isEditingDone, setIsEditingDone] = useState(false);
  const params = useParams();
  const { dataDetails } = useSelector(state => state.projectType);
  const { loading } = useSelector(state => state.projectType);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailsProjectType(params.id));
  }, [isEditingDone]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="sm:flex sm:justify-center">
          {update ? (
            <FormEditProjectType
              dataDetails={dataDetails.record}
              setUpdate={setUpdate}
              setIsEditingDone={setIsEditingDone}
              isEditingDone={isEditingDone}
            />
          ) : (
            <FormDetailProjectType setUpdate={setUpdate} dataDetails={dataDetails.record} />
          )}
        </div>
      )}
    </div>
  );
};
