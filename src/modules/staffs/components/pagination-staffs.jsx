import { FcLeft, FcRight } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { changeNumberPage } from "../staffs.actions";
import * as Constants from "../staffs.constants";

export const PaginationStaffs = () => {
  const dispatch = useDispatch();
  const { numberStaffs } = useSelector(state => state.staffs);
  const { page } = useSelector(state => state.staffs);

  const numberPages = Math.ceil(numberStaffs / Constants.LIMIT_ITEM_ONE_PAGE);

  const handleChangePage = e => {
    const numberPage = e.selected + 1;
    dispatch(changeNumberPage(numberPage));
  };

  return (
    numberPages > 1 && (
      <div className="flex  w-11/12 justify-center mt-10 mb-20">
        <ReactPaginate
          previousLabel={<FcLeft className="text-2xl flex items-center focus:outline-white border-none" />}
          nextLabel={<FcRight className="text-2xl" />}
          breakLabel="..."
          breakClassName="w-20"
          pageCount={numberPages}
          initialPage={page - 1}
          // initialPage={0}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={handleChangePage}
          containerClassName="w-1/5 outline-none flex justify-around"
          subContainerClassName=""
          activeClassName="flex items-center shadow border-blue-500 border-2 rounded-full px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
        />
      </div>
    )
  );
};
