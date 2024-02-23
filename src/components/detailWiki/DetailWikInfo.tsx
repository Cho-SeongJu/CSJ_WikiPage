import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { IWiki } from "../../interface/wiki";

interface IDetailWikiInfo {
  readonly wikiInfo: IWiki;
}

interface ITitle {
  readonly id: number;
  readonly title: string;
}

const DetailWikiInfo = ({ wikiInfo }: IDetailWikiInfo) => {
  const { axiosData } = useAxios();
  const [replaceContent, setReplaceContent] = useState<string>("");

  const changeMatchTitle = (titles: ITitle[]) => {
    setReplaceContent(wikiInfo.content);

    titles.forEach((title) => {
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
  };

  const getAllWikiTitle = async () => {
    const response = await axiosData({
      method: "GET",
      url: `/wikiList`,
    });

    if (response) {
      const titles = response.data.flatMap((wiki: IWiki) => {
        return { title: wiki.title, id: wiki.id };
      });
      changeMatchTitle(titles);
    }
  };

  useEffect(() => {
    getAllWikiTitle();
  }, []);

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
