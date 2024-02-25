import { Link, useParams } from "react-router-dom";
import useDeleteWiki from "../../hooks/mutations/useDeleteWiki";

const EditAndDeleteButton = () => {
  const { wikiId } = useParams();
  const { mutate } = useDeleteWiki();

  const handleDeleteWiki = async () => {
    const result = confirm("삭제를 하시겠습니까?");

    if (!result) return;

    mutate();
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
