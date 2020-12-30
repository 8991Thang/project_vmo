import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/loading/loading";
import { getDetailsCustomers } from "../customers.services";
import { FormDetailCustomer } from "./form-detail-customer";
import { FormEditCustomer } from "./form-edit-customer";
export const DetailsCustomer = () => {
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const params = useParams();
  const { dataDetails } = useSelector(state => state.customers);
  const { loading: loadingCustomers } = useSelector(state => state.customers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailsCustomers(params.id));
  }, [update]);
  return (
    <div>
      <div>
        {loadingCustomers ? (
          <Loading />
        ) : (
          <div>
            {editStatus ? (
              <FormEditCustomer
                setUpdate={setUpdate}
                dataDetails={dataDetails}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailCustomer setUpdate={setEditStatus} dataDetails={dataDetails} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
