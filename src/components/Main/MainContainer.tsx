import { useState } from "react";
import useWikiList from "../../hooks/queries/useWikiList";
import Loading from "../common/Loading";
import CreateWikiButton from "./CreateWikiButton";
import Pagination from "./Pagination";
import WikiList from "./WikiList";
import WikiTitle from "./WikiTitle";

const MainContainer = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isFetching } = useWikiList(page);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="w-96">
        <CreateWikiButton />
        <WikiTitle />
        {isFetching || !data ? (
          <Loading />
        ) : (
          <>
            <WikiList wikiList={data.data} />
            <Pagination
              totalItems={data.items}
              itemCountPerPage={5}
              pageCount={5}
              currentPage={page}
              setPage={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
