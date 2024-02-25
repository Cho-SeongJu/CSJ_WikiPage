import useWikiDetail from "../../hooks/queries/useWikiDetail";
import Loading from "../common/Loading";
import DetailWikiInfo from "./DetailWikInfo";
import EditAndDeleteButton from "./EditAndDeleteButton";

const DetailWikiContainer = () => {
  const { data, isFetching } = useWikiDetail();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-[40rem] h-[40rem] bg-white px-14">
        {isFetching || !data ? (
          <Loading />
        ) : (
          <>
            <EditAndDeleteButton />
            <DetailWikiInfo wikiInfo={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailWikiContainer;
