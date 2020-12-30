import { useHistory } from "react-router-dom";

export const RowTableDepartments = ({
  number,
  name,
  description,
  link,
}) => {
  const history = useHistory();
  const onClickRedirect = () => {
    history.push(link);
  };
  return (
    <tr
      onClick={onClickRedirect}
      className=" flex w-full justify-around pt-4 pb-4 border-gray-200 hover:bg-gray-200 cursor-pointer border-b-2"
    >
      <td className=" w-1/6 text-center" data-title="STT">
        {number}
      </td>
      <td
        className="w-2/6 pr-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
        data-title="type"
      >
        {name}
      </td>
      <td
        className="w-3/6 pr-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
        data-title="Description"
      >
        {description}
      </td>
    </tr>
  );
};
