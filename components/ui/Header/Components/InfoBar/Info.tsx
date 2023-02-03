import useInfoBar from "@_hooks/header/useInfoBar";
import { Bar } from "@_types/header";
import { ParsedUrlQuery } from "querystring";
import { FunctionComponent } from "react";
import ExtraBar from "./ExtraBar";
import classes from "./Info.module.css";
import InfoBar from "./InfoBar";

interface InfoProps {
  info: Bar;
  query: ParsedUrlQuery;
  sticky?: boolean;
}

const Info: FunctionComponent<InfoProps> = ({ info, query, sticky }) => {
  const { infoHeadings, extraContents } = useInfoBar(info, query);

  if (info.renderInfoBar) {
    return (
      <>
        <InfoBar
          queryParameterName={info.infoParameterName}
          contents={infoHeadings}
          query={query}
          sticky={sticky}
        ></InfoBar>
        {info.renderExtraBar && (
          <ExtraBar
            contents={extraContents}
            queryParameterName={info.extraParameterName}
            query={query}
            showBar={extraContents.length !== 0}
            sticky={sticky}
          />
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default Info;
