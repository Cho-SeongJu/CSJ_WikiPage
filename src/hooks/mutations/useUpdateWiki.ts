import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { IFormValue } from "../../interface/wikiForm";

const useUpdateWiki = (formValue: IFormValue) => {
  const { axiosData } = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { wikiId } = useParams() as {
    wikiId: string;
  };

  const updateWiki = async () => {
    const response = await axiosData({
      method: "PUT",
      url: `/wikiList/${wikiId}`,
      data: {
        title: formValue.title,
        content: formValue.content,
      },
    });

    if (response) {
      const status = response.status;

      if (status === 200) {
        alert("수정이 완료되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["wiki", wikiId] });
        queryClient.invalidateQueries({ queryKey: ["wikiList", ""] });
        navigate(`/detailWiki/${wikiId}`);
      } else {
        alert("등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.");
      }
    }
  };

  return useMutation({ mutationFn: updateWiki });
};

export default useUpdateWiki;
