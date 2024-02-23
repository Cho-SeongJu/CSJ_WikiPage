import { IWiki } from "../../interface/wiki";
import WikiCard from "./WikiCard";

interface IWikiListProps {
  readonly wikiList : IWiki[];
}

const WikiList = ({wikiList} : IWikiListProps) => {
  const isExistWikiList = wikiList.length !== 0;
  return (
    <div className="w-full min-h-[30rem] grid grid-cols-1 grid-rows-5">
      {isExistWikiList ? wikiList.map((wiki: IWiki) => (
        <WikiCard
          key={wiki.id}
          wiki={wiki}
        />
      )) : (
        <div>
          <p>등록된 위키가 없습니다. 지금 위키를 등록해주세요 :)</p>
        </div>
      )}
    </div>
  );
};

export default WikiList;
