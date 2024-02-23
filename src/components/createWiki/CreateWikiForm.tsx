import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { checkFormValue } from "../../utils/checkHasEmptyValue";

interface IFormValue {
  readonly title: string;
  readonly content: string;
}

const CreateWikiForm = () => {
  const [formValue, setFormValue] = useState<IFormValue>({
    title: "",
    content: "",
  });
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

    const result = confirm("등록을 하시겠습니까?");

    if (!result) return;

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
        navigate(`/detailWiki/${data.id}`);
      } else {
        alert("등록에 실패하였습니다. 잠시 후에 다시 시도해주세요.");
      }
    }
  };

  const handleCancelCreateWiki = () => {
    const isEmpty = checkFormValue(formValue);

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
          onChange={(event) => handleChangeFormValue("title", event)}
          placeholder="제목을 입력하세요."
        />
        <textarea
          className="mt-4 px-4 py-4 h-96 border border-black-200 rounded outline-none resize-none"
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
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWikiForm;
