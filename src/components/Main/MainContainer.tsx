import { useLayoutEffect, useState } from "react";
import { API_SERVER_URL } from "../../constants/server";
import useAxios from "../../hooks/useAxios";
import { IWiki } from "../../interface/wiki";
import Loading from "../common/Loading";
import WikiList from "./WikiList";
import WikiTitle from "./WikiTitle";
import CreateWikiButton from "./CreateWikiButton";

const MainContainer = () => {
  const [page, setPage] = useState<number>(1);
  const [wikiList, setWikiList] = useState<IWiki[]>([])
  const { isFetchLoading, axiosData} = useAxios();

  const getWikiListData = async () => {
    const response = await axiosData({
      method: "GET",
      url : `${API_SERVER_URL}/wikiList?_page=${page}&_per_page=5`
    });

    if(response) {
      setWikiList(response.data.data);
    }
  }

  useLayoutEffect(() => {
    getWikiListData();
  }, [page])

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="w-96">
        <CreateWikiButton />
        <WikiTitle />
        {isFetchLoading ? 
          <Loading />
        :
        <WikiList wikiList={wikiList}/>
      }
      </div>
    </div>
  );
};

export default MainContainer;
