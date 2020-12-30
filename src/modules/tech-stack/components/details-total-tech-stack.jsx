import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/loading/loading";
import { getDetailsTechStack } from "../tech-stack.services";
import { FormDetailTechStack } from "./form-detail-tech-stack";
import { FormEditTechStack } from "./form-edit-tech-stack";
export const DetailsTeckStack = () => {
  const [isEditingDone, setIsEditingDone] = useState(false);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { detailsTeckStack } = useSelector(state => state.techStack);
  const { loading } = useSelector(state => state.techStack);
  useEffect(() => {
    dispatch(getDetailsTechStack(params.id));
  }, [isEditingDone]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {update ? (
            <FormEditTechStack
              detailsTeckStack={detailsTeckStack.record}
              setIsEditingDone={setIsEditingDone}
              setUpdate={setUpdate}
              isEditingDone={isEditingDone}
            />
          ) : (
            <FormDetailTechStack setUpdate={setUpdate} detailsTeckStack={detailsTeckStack.record} />
          )}
        </div>
      )}
    </div>
  );
};
