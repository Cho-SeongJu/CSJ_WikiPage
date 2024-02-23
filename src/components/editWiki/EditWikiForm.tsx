import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { ChangeEvent, FormEvent, useState } from "react";
import { IFormValue } from "../../interface/wikiForm";
import { IWiki } from "../../interface/wiki";
import { checkFormValue } from "../../utils/checkHasEmptyValue";

interface IEditWikiForm {
  readonly wikiInfo: IWiki;
}

const EditWikiForm = ({ wikiInfo }: IEditWikiForm) => {
  const { wikiId } = useParams();
  const [formValue, setFormValue] = useState<IFormValue>(wikiInfo);
  const navigate = useNavigate();
  const { axiosData } = useAxios();

  const handleChangeFormValue = (
    type: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormValue((prev) => ({ ...prev, [type]: value }));
  };

  const submitFormValue = async (e: FormEvent) => {
    e.preventDefault();

    const result = confirm("수정을 하시겠습니까?");

    if (!result) return;

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
        navigate(`/detailWiki/${wikiId}`);
      } else {
        alert("등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.");
      }
    }
  };

  const handleCancelCreateWiki = () => {
    const isEmpty = checkFormValue({
      title: formValue.title,
      content: formValue.content,
    });

    if (!isEmpty) return;
    navigate("/");
  };

  return (
    <div className="w-[40rem] h-[40rem] bg-white px-14">
      <form
        onSubmit={submitFormValue}
        className="flex flex-col my-4"
      >
        <input
          type="text"
          className="border-b border-black-200 outline-none px-4 py-4"
          value={formValue.title}
          onChange={(event) => handleChangeFormValue("title", event)}
          placeholder="제목을 입력하세요."
        />
        <textarea
          className="mt-4 px-4 py-4 h-96 border border-black-200 rounded outline-none resize-none"
          value={formValue.content}
          onChange={(event) => handleChangeFormValue("content", event)}
          placeholder="내용을 입력하세요."
        />
        <div className="flex justify-center mt-16 w-full text-white">
          <button
            type="button"
            onClick={handleCancelCreateWiki}
            className="mx-2 w-16 h-10 bg-red-500 rounded hover:bg-red-400"
          >
            취소
          </button>
          <button
            type="submit"
            className="mx-2 w-16 h-10 bg-blue-500 rounded hover:bg-blue-400"
          >
            수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWikiForm;
