import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../../../api/api";
import { Loading } from "../../../components/loading/loading";
import { REACT_APP_API_SERVER_CUSTOMERS } from "../../../constants/constants";
import { FormDetailCustomer } from "./form-detail-customer";
import { FormEditCustomer } from "./form-edit-customer";
export const DetailsCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [detailsCustomer, setDataDetailsCustomers] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [update, setUpdate] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDataDetailsCustomer = async () => {
      setLoading(true);
      const apiCustomer = `${REACT_APP_API_SERVER_CUSTOMERS}/${params.id}`;
      try {
        const respon = await apiGet(apiCustomer);
        const { data } = respon.data;
        setDataDetailsCustomers(data);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
      }
    };
    getDataDetailsCustomer();
  }, [update]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {editStatus ? (
              <FormEditCustomer
                setUpdate={setUpdate}
                dataDetails={detailsCustomer}
                setEdit={setEditStatus}
                update={update}
              />
            ) : (
              <FormDetailCustomer setUpdate={setEditStatus} dataDetails={detailsCustomer} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
