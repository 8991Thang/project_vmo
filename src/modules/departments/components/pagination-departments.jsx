import { FcLeft, FcRight } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { changeNumberPage } from "../departments.actions";
import * as CONSTANTS from "../departments.constants";

export const PaginationDepartments = () => {
  const dispatch = useDispatch();
  const { numberDepartments } = useSelector(state => state.departments);
  const numberPages = Math.ceil(numberDepartments / CONSTANTS.LIMIT_ITEM_ONE_PAGE);
  const { page } = useSelector(state => state.departments);

  const handleChangePage = e => {
    const numberPage = e.selected + 1;
    dispatch(changeNumberPage(numberPage));
  };

  return (
    numberPages > 1 && (
      <div className="flex w-11/12 justify-center mt-10 mb-20">
        <ReactPaginate
          previousLabel={
            <FcLeft
              style={{ outline: "none" }}
              className="text-2xl flex items-center focus:outline-white border-none"
            />
          }
          nextLabel={<FcRight className="text-2xl" />}
          breakLabel="..."
          breakClassName="w-20"
          pageCount={numberPages}
          initialPage={page - 1}
          // initialPage={0}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={handleChangePage}
          containerClassName="w-1/5 flex justify-around sm:w-3/4"
          subContainerClassName=""
          activeClassName="flex items-center shadow border-blue-500 border-2 rounded-full px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
        />
      </div>
    )
  );
};
