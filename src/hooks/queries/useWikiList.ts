import { useQuery } from "@tanstack/react-query";
import { API_SERVER_URL } from "../../constants/server";
import useAxios from "../useAxios";
import { WIKI_QUERY_KEY } from "./queryKey";

const useWikiList = (page: number) => {
  const { axiosData } = useAxios();

  const getWikiListData = async () => {
    const response = await axiosData({
      method: "GET",
      url: `${API_SERVER_URL}/wikiList?_page=${page}&_per_page=5`,
    });

    return response?.data;
  };

  return useQuery({
    queryKey: WIKI_QUERY_KEY.wikiList(page),
    queryFn: getWikiListData,
  });
};

export default useWikiList;
