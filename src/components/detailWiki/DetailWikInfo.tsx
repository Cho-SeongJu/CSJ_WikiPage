import { useEffect, useState } from "react";
import useWikiTotalTitle from "../../hooks/queries/useWikiTotalTitle";
import { IWiki } from "../../interface/wiki";

interface IDetailWikiInfo {
  readonly wikiInfo: IWiki;
}

interface ITitle {
  readonly id: number;
  readonly title: string;
}

const DetailWikiInfo = ({ wikiInfo }: IDetailWikiInfo) => {
  const [replaceContent, setReplaceContent] = useState<string>("");
  const { data } = useWikiTotalTitle();

  useEffect(() => {
    if (data) {
      setReplaceContent(wikiInfo.content);

      data.forEach((title: ITitle) => {
        const regex = new RegExp(`${title.title}(?!\\d)`, "g");
        if (wikiInfo.content.match(regex)) {
          const content = wikiInfo.content.replace(
            regex,
            `<a href=${"/detailWiki/" + title.id} class="text-blue-500" >${
              title.title
            }</a>`
          );
          setReplaceContent(content);
        }
      });
    }
  }, [data, wikiInfo.content]);

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold py-4 border-b">{wikiInfo.title}</h1>
      </div>
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: replaceContent }}
          className="py-4"
        />
      </div>
    </div>
  );
};

export default DetailWikiInfo;
