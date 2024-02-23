import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import DetailWikiInfo from "./DetailWikInfo";
import EditAndDeleteButton from "./EditAndDeleteButton";
import { useLayoutEffect, useState } from "react";
import { IWiki } from "../../interface/wiki";

const DetailWikiContainer = () => {
  const { wikiId } = useParams();
  const { isFetchLoading, axiosData } = useAxios();
  const [wikiInfo, setWikiInfo] = useState<IWiki | null>(null);

  const getDetailWikiData = async () => {
    const response = await axiosData({
      url: `/wikiList?id=${wikiId}`,
      method: "GET",
    });

    if (response) {
      const data: IWiki = response.data[0];
      setWikiInfo(data);
    }
  };

  useLayoutEffect(() => {
    getDetailWikiData();
  }, []);

  if (!wikiInfo) return <div>asd</div>;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-[40rem] h-[40rem] bg-white px-14">
        {isFetchLoading ? (
          <div className="flex items-center justify-center">로딩중...</div>
        ) : (
          <>
            <EditAndDeleteButton />
            <DetailWikiInfo wikiInfo={wikiInfo} />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailWikiContainer;
