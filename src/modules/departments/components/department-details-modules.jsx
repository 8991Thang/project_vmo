import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteDepartment,
  getDepartmentDetailsFromApi,
  updateDepartment,
} from "../departments.services";
import { FormDepartmentDetails } from "./form-department-details";
import { FormEditDepartmentDetails } from "./form-edit-department-details";
import { setLinkRedirect } from "../../../app/statusReducers";
import { Loading } from "../../../components/loading/loading";

export const DepartmentDetailsModules = () => {
  const [update, setUpdate] = useState(false);
  const params = useParams();
  const { dataDetails } = useSelector(state => state.departments);
  const { loading } = useSelector(state => state.departments);
  const { link } = useSelector(state => state.departments);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLinkRedirect(link));
  }, [link]);

  useEffect(() => {
    dispatch(getDepartmentDetailsFromApi(params.id));
  }, [update]);

  const onSubmitUpdateDepartment = data => {
    const { _id } = dataDetails;
    dispatch(updateDepartment(_id, data));
    setUpdate(!update);
  };

  const sumbitDeleteDepartment = () => {
    const { _id } = dataDetails;
    dispatch(deleteDepartment(_id));
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center">
          {update ? (
            <FormEditDepartmentDetails
              onSubmit={onSubmitUpdateDepartment}
              setUpdate={setUpdate}
            />
          ) : (
            <FormDepartmentDetails
              sumbitDelete={sumbitDeleteDepartment}
              setUpdate={setUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
};
