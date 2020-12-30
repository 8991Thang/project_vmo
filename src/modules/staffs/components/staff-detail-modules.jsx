import { useEffect, useState } from "react";
import { Loading } from "../../../components/loading/loading";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStaffsDetailsFromApi } from "../staffs.services";
import { getListTechStack } from "../../../services/tech-stack.services";
import { getRoleStaffsStatus } from "../../../services/roles";
import { FormEditStaff } from "./form-edit-staff";
import { FormStaffDetail } from "./form-staff-detail";
import { setLinkRedirect } from "../../../reducers/statusReducers";

export const StaffDetailModules = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { link } = useSelector(state => state.staffs);

  const [update, setUpdate] = useState(false);
  const { loading } = useSelector(state => state.staffs);
  useEffect(() => {
    dispatch(getRoleStaffsStatus());
    dispatch(getStaffsDetailsFromApi(params.id));
    dispatch(getListTechStack(""));
  }, []);
  useEffect(() => {
    dispatch(setLinkRedirect(link));
  }, [link]);
  useEffect(() => {
    dispatch(getStaffsDetailsFromApi(params.id));
  }, [update]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {update ? (
            <FormEditStaff setUpdate={setUpdate} />
          ) : (
            <FormStaffDetail setUpdate={setUpdate} />
          )}
        </div>
      )}
    </div>
  );
};
