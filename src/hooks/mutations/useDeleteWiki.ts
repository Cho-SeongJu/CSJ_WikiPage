import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../useAxios";
import { useNavigate, useParams } from "react-router-dom";

const useDeleteWiki = () => {
  const { wikiId } = useParams() as {
    wikiId: string;
  };
  const navigate = useNavigate();
  const { axiosData } = useAxios();
  const queryClient = useQueryClient();

  const deleteWiki = async () => {
    const response = await axiosData({
      method: "DELETE",
      url: `/wikiList/${wikiId}`,
    });

    if (response) {
      const status = response.status;

      if (status === 200) {
        alert("삭제가 완료되었습니다.");
        queryClient.removeQueries({ queryKey: ["wiki", wikiId] });
        queryClient.invalidateQueries({ queryKey: ["wikiList"] });
        navigate("/");
      } else {
        alert(
          "삭제가 정상적으로 처리되지 않았습니다. 잠시 후에 다시 시도해주세요."
        );
      }
    }
  };

  return useMutation({ mutationFn: deleteWiki });
};

export default useDeleteWiki;
