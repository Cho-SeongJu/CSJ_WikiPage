import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../useAxios";
import { useNavigate } from "react-router-dom";
import { IFormValue } from "../../interface/wikiForm";

const useCreateWiki = (formValue: IFormValue) => {
  const { axiosData } = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createWiki = async () => {
    const response = await axiosData({
      method: "POST",
      url: "/wikiList",
      data: {
        title: formValue.title,
        content: formValue.content,
      },
    });

    if (response) {
      const status = response.status;
      const data = response.data;

      if (status === 201) {
        alert("등록이 완료되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["wikiList"] });
        navigate(`/detailWiki/${data.id}`);
      } else {
        alert("등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.");
      }
    }
  };

  return useMutation({
    mutationFn: createWiki,
  });
};

export default useCreateWiki;
