import { Bar, Category } from "@_types/header";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

const useInfoBar = (info: Bar, query: ParsedUrlQuery) => {
  const [infoContents, setInfoContents] = useState<Category>({});
  const [infoHeadings, setInfoHeadings] = useState<string[]>([]);
  const [extraContents, setExtraContents] = useState<string[]>([]);
  const fetchInfoBar = async () => {
    if (info.renderInfoBar) {
      try {
        const contents = await info.getInfoBarInfo();
        setInfoContents(contents);
        setInfoHeadings(Object.keys(contents));
        getExtraBarContents();
      } catch (e) {}
    }
  };

  const fetchExtraBar = async (category: number | null) => {
    if (info.renderExtraBar) {
      try {
        const contents = await info.getExtraBarInfo(category);
        setExtraContents(contents);
      } catch (e) {}
    }
  };

  const getExtraBarContents = () => {
    if (info.renderExtraBar && info.renderInfoBar) {
      const index =
        (query[info.infoParameterName] as string) || infoHeadings[0];
      const id = infoContents[index];
      fetchExtraBar(id);
    }
  };

  useEffect(() => {
    setInfoHeadings([]);
    fetchInfoBar();
  }, [info]);

  useEffect(() => {
    getExtraBarContents();
  }, [query]);

  return { infoHeadings, extraContents };
};

export default useInfoBar;
