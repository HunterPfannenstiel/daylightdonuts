import useInfoBar from "@_hooks/header/useInfoBar";
import { Bar } from "@_types/header";
import { FunctionComponent } from "react";
import ExtraBar from "./ExtraBar";
import InfoBar from "./InfoBar";
import { useSearchParams } from "next/navigation";

interface InfoProps {
  info: Bar;
  sticky?: boolean;
}

const Info: FunctionComponent<InfoProps> = ({ info, sticky }) => {
  const searchParams = useSearchParams();
  const { infoHeadings, extraContents } = useInfoBar(info, searchParams);

  if (info.renderInfoBar) {
    return (
      <>
        <InfoBar
          queryParameterName={info.infoParameterName}
          contents={infoHeadings}
          params={searchParams}
          sticky={sticky}
        ></InfoBar>
        {info.renderExtraBar && (
          <ExtraBar
            contents={extraContents}
            queryParameterName={info.extraParameterName}
            params={searchParams}
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
