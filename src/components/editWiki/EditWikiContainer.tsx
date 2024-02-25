import useWikiDetail from "../../hooks/queries/useWikiDetail";
import Loading from "../common/Loading";
import EditWikiForm from "./EditWikiForm";

const EditWikiContainer = () => {
  const { data, isLoading } = useWikiDetail();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {isLoading ? <Loading /> : <EditWikiForm wikiInfo={data} />}
    </div>
  );
};

export default EditWikiContainer;
