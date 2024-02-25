import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { WIKI_QUERY_KEY } from "./queryKey";
import useAxios from "../useAxios";
import { useCallback } from "react";

const useWikiDetail = () => {
  const { wikiId } = useParams() as {
    wikiId: string;
  };
  const { axiosData } = useAxios();

  const getDetailWikiData = useCallback(async () => {
    const response = await axiosData({
      url: `/wikiList?id=${wikiId}`,
      method: "GET",
    });

    return response?.data[0];
  }, [axiosData, wikiId]);

  return useQuery({
    queryKey: WIKI_QUERY_KEY.wikiDetail(wikiId),
    queryFn: getDetailWikiData,
  });
};

export default useWikiDetail;
