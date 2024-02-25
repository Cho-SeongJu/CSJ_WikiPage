import { Dispatch, useEffect, useMemo, useState } from "react";

interface IPaginationProps {
  readonly totalItems: number;
  readonly itemCountPerPage: number;
  readonly pageCount: number;
  readonly currentPage: number;
  readonly setPage: Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
  setPage,
}: IPaginationProps) => {
  const [start, setStart] = useState(1);
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemCountPerPage),
    [itemCountPerPage, totalItems]
  );

  const onClickNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const onClickPrevPage = () => {
    setPage((prev) => prev - 1);
  };

  const onClickPage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <ul className="flex justify-center items-center">
      <li className="bg-gray-400 text-white hover:bg-gray-300 p-1 rounded">
        <button
          type="button"
          className="w-8"
          disabled={currentPage === 1}
          onClick={onClickPrevPage}
        >
          이전
        </button>
      </li>
      {[...Array(pageCount)].map((_, i) => (
        <>
          {start + i <= totalPages && (
            <li key={i}>
              <button
                type="button"
                className={`${
                  i + 1 === currentPage ? "text-blue-100" : "text-black"
                } flex justify-center w-2 px-2 mx-1`}
                onClick={() => onClickPage(start + i)}
              >
                {start + i}
              </button>
            </li>
          )}
        </>
      ))}
      <li className="bg-gray-400 text-white hover:bg-gray-300 p-1 rounded">
        <button
          type="button"
          onClick={onClickNextPage}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
