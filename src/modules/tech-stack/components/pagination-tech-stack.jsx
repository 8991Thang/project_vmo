import { FcLeft, FcRight } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

export const PaginationTechStack = ({ onChange }) => {
  const { limit, page, numberDoc } = useSelector(state => state.techStack);
  const totalPage = Math.ceil(numberDoc / limit);
  return (
    <div className="flex w-11/12 sm:w-full justify-center mt-10 mb-20">
      {totalPage > 1 && (
        <ReactPaginate
          previousLabel={
            <FcLeft className="text-2xl flex items-center outline-white border-none" />
          }
          nextLabel={<FcRight className="text-2xl " />}
          breakLabel="..."
          pageCount={totalPage}
          initialPage={page - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={onChange}
          containerClassName="w-2/12 sm:w-4/12 lg:w-3/12 flex justify-between"
          activeClassName="flex items-center shadow border-blue-500 border-2 rounded-full  px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
        />
      )}
    </div>
  );
};
