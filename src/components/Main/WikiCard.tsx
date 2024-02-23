import { Link } from "react-router-dom";
import { IWiki } from "../../interface/wiki";

interface IWikiCareProps {
  readonly wiki: IWiki;
}

const WikiCard = ({ wiki }: IWikiCareProps) => {
  return (
    <Link
      to={`/detailWiki/${wiki.id}`}
      className="flex items-center mb-4 px-4 w-full h-20 max-h-20 bg-white border border-black-200 rounded font-medium text-lg hover:scale-105 duration-200"
    >
      {wiki.title}
    </Link>
  );
};

export default WikiCard;
