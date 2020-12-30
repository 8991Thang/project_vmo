import { FcLeft, FcRight } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { changeNumberPage } from "./../projects.actions";
import * as Constants from "../projects.constans";

export const PaginationProjects = () => {
  const dispatch = useDispatch();
  const { numberDoc } = useSelector(state => state.projects);
  const { page } = useSelector(state => state.projects);

  const numberPages = Math.ceil(numberDoc / Constants.LIMIT_ITEM_ONE_PAGE);

  const handleChangePage = e => {
    const numberPage = e.selected + 1;
    dispatch(changeNumberPage(numberPage));
  };

  return (
    numberPages > 1 && (
      <div className="flex w-1/3 mx-auto mt-10 mb-20">
        <ReactPaginate
          previousLabel={<FcLeft
            style={{ outline: "none" }}
            className="text-2xl flex items-center focus:outline-white border-none" />}
          nextLabel={<FcRight className="text-2xl" />}
          breakLabel="..."
          pageCount={numberPages}
          initialPage={page - 1}
          // initialPage={0}
          marginPagesDisplayed={1}
          breakClassName="w-20"
          pageRangeDisplayed={4}
          onPageChange={handleChangePage}
          containerClassName="w-1/2 flex justify-around"
          subContainerClassName=""
          activeClassName= "flex items-center shadow border-blue-500 border-2 rounded-full px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
        />
      </div>
    )
  );
};
