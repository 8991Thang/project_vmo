import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/loading/loading";
import { deleteProjects, getDetailsProjects } from "../projects.services";
import { FormDetailProjects } from "./form-detail-projects";
import { FormEditProjects } from "./form-edit-projects";
import { setLinkRedirect } from "../../../app/statusReducers";

export const DetailsProjects = () => {
  const [update, setUpdate] = useState(false);
  const params = useParams();
  const { dataDetails } = useSelector(state => state.projects);
  const { loading } = useSelector(state => state.projects);
  const { link } = useSelector(state => state.projects);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailsProjects(params.id));
  }, []);

  useEffect(() => {
    dispatch(setLinkRedirect(link));
  }, [link]);

  const sumbitDeleteProjects = () => {
    const { _id } = dataDetails;
    dispatch(deleteProjects(_id));
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="sm:flex sm:justify-center">
          {update ? (
            <FormEditProjects dataDetails={dataDetails} setUpdate={setUpdate} />
          ) : (
            <FormDetailProjects
              setUpdate={setUpdate}
              dataDetails={dataDetails}
              deleteProjects={sumbitDeleteProjects}
            />
          )}
        </div>
      )}
    </div>
  );
};
