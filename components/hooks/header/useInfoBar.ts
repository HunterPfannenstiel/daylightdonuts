import { Bar, Category } from "@_types/header";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useInfoBar = (info: Bar, params: ReadonlyURLSearchParams | null) => {
  const [infoContents, setInfoContents] = useState<Category[]>([]);
  const [infoHeadings, setInfoHeadings] = useState<string[]>([]);
  const [extraContents, setExtraContents] = useState<string[]>([]);
  const fetchInfoBar = async () => {
    if (info.renderInfoBar) {
      const contents = await info.getInfoBarInfo();
      setInfoContents(contents);
      setInfoHeadings(contents.map((category) => category.category));
      getExtraBarContents();
    }
  };

  const getExtraBarContents = () => {
    if (info.renderExtraBar && info.renderInfoBar) {
      let index = -1;
      if (params) {
        index = infoContents.findIndex(
          (category) => category.category === params.get(info.infoParameterName)
        );
      }
      // (query[info.infoParameterName] as string) || infoHeadings[0];
      if (index !== -1) {
        const subcategories = infoContents[index].subcategories;
        if (subcategories[0] !== null)
          setExtraContents(subcategories as string[]);
        else setExtraContents([]);
      }
    }
  };

  useEffect(() => {
    setInfoHeadings([]);
    fetchInfoBar();
  }, [info]);

  useEffect(() => {
    getExtraBarContents();
  }, [params]);

  return { infoHeadings, extraContents };
};

export default useInfoBar;
