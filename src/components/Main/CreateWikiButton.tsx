import { Link } from "react-router-dom";

const CreateWikiButton = () => {
  return (
    <div className="flex justify-end">
      <Link
        to="/create"
        className="font-semibold bg-blue-300 py-2 px-4 rounded text-white hover:bg-blue-200"
      >
        등록
      </Link>
    </div>
  );
};

export default CreateWikiButton;
