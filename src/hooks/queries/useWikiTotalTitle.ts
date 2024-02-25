import { useQuery } from "@tanstack/react-query";
import { API_SERVER_URL } from "../../constants/server";
import useAxios from "../useAxios";
import { WIKI_QUERY_KEY } from "./queryKey";
import { IWiki } from "../../interface/wiki";

const useWikiTotalTitle = () => {
  const { axiosData } = useAxios();

  const getWikiListData = async () => {
    const response = await axiosData({
      method: "GET",
      url: `${API_SERVER_URL}/wikiList`,
    });

    const titles = response?.data.flatMap((wiki: IWiki) => {
      return { title: wiki.title, id: wiki.id };
    });

    return titles;
  };

  return useQuery({
    queryKey: WIKI_QUERY_KEY.wikiList(""),
    queryFn: getWikiListData,
  });
};

export default useWikiTotalTitle;
