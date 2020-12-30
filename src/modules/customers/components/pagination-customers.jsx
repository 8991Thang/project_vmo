import { FcLeft, FcRight } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

export const PaginationCustomers = ({ onChange }) => {
  const { limit: limitCustomers } = useSelector(state => state.customers);
  const { numberDoc } = useSelector(state => state.customers);
  const totalPage = Math.ceil(numberDoc / limitCustomers);
  const { page: pageCustomers } = useSelector(state => state.customers);
  return (
    <div className="flex w-11/12 sm:w-full justify-center mt-10 mb-20">
      {totalPage > 1 && (
        <ReactPaginate
          previousLabel={
            <FcLeft className="text-2xl flex items-center focus:outline-white border-none" />
          }
          nextLabel={<FcRight className="text-2xl " />}
          breakLabel="..."
          breakClassName="w-20"
          pageCount={totalPage}
          initialPage={pageCustomers - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={onChange}
          containerClassName="w-2/12 sm:w-4/12 lg:w-3/12 flex justify-around"
          activeClassName="flex items-center shadow border-blue-500 border-2 rounded-full px-2   text-blue-500 hover:bg-blue-500 hover:text-white"
        />
      )}
    </div>
  );
};
