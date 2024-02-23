import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import EditWikiForm from "./EditWikiForm";
import { IWiki } from "../../interface/wiki";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";

const EditWikiContainer = () => {
  const { wikiId } = useParams();
  const { isFetchLoading, axiosData } = useAxios();
  const [wikiInfo, setWikiInfo] = useState<IWiki | null>(null);

  const getWikiDetail = async () => {
    const response = await axiosData({
      method: "GET",
      url: `/wikiList/${wikiId}`,
    });

    if (response) {
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        setWikiInfo(data);
      }
    }
  };

  useEffect(() => {
    getWikiDetail();
  }, []);

  if (!wikiInfo || isFetchLoading) return <Loading />;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <EditWikiForm wikiInfo={wikiInfo} />
    </div>
  );
};

export default EditWikiContainer;
