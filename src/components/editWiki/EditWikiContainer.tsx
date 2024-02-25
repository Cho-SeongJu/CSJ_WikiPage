import useWikiDetail from "../../hooks/queries/useWikiDetail";
import Loading from "../common/Loading";
import EditWikiForm from "./EditWikiForm";

const EditWikiContainer = () => {
  const { data, isFetching } = useWikiDetail();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {isFetching || !data ? <Loading /> : <EditWikiForm wikiInfo={data} />}
    </div>
  );
};

export default EditWikiContainer;
