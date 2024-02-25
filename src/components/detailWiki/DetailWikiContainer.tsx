import useWikiDetail from "../../hooks/queries/useWikiDetail";
import DetailWikiInfo from "./DetailWikInfo";
import EditAndDeleteButton from "./EditAndDeleteButton";

const DetailWikiContainer = () => {
  const { data, isLoading } = useWikiDetail();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-[40rem] h-[40rem] bg-white px-14">
        {isLoading ? (
          <div className="flex items-center justify-center">로딩중...</div>
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
