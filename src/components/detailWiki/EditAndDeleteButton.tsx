import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const EditAndDeleteButton = () => {
  const { wikiId } = useParams();
  const navigate = useNavigate();
  const { axiosData } = useAxios();

  const handleDeleteWiki = async () => {
    const result = confirm("삭제를 하시겠습니까?");

    if (!result) return;

    const response = await axiosData({
      method: "DELETE",
      url: `/wikiList/${wikiId}`,
    });

    if (response) {
      const status = response.status;

      if (status === 200) {
        alert("삭제가 완료되었습니다.");
        navigate("/");
      } else {
        alert(
          "삭제가 정상적으로 처리되지 않았습니다. 잠시 후에 다시 시도해주세요."
        );
      }
    }
  };

  return (
    <div className="flex justify-end pt-6 pb-4 text-sm text-blue-100">
      <Link
        to={`/edit/${wikiId}`}
        type="button"
        className="px-2"
      >
        수정
      </Link>
      <button
        type="button"
        className="px-2"
        onClick={handleDeleteWiki}
      >
        삭제
      </button>
    </div>
  );
};

export default EditAndDeleteButton;
