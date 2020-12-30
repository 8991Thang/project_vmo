import { useHistory } from "react-router-dom";
import { formatDate } from "../../../utils/format-date";

const RowTableProjects = ({ number, type, description, link, date }) => {
  const convertDate = formatDate(date);
  const history = useHistory();
  const onClickRedirect = () => {
    history.push(link);
  };
  return (
    <tbody>
      <tr
        onClick={onClickRedirect}
        className=" flex w-full justify-around pt-4 pb-4 border-gray-200 hover:bg-gray-200 cursor-pointer border-b-2"
      >
        <td className=" w-1/12 text-center" data-title="STT">
          {number}
        </td>
        <td
          className="w-2/12 text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
          data-title="type"
        >
          {type}
        </td>
        <td
          className="w-2/12 text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
          data-title="Description"
        >
          {description}
        </td>
        <td className=" w-2/12 text-center sm:hidden pl-5" data-title="Priority">
          {convertDate}
        </td>
      </tr>
    </tbody>
  );
};

export default RowTableProjects;
