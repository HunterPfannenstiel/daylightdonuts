import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { ParsedUrlQuery } from "querystring";
import { FunctionComponent, useEffect } from "react";
import IInfoBar from "./IInfoBar";

interface InfoBarProps {
  contents: string[];
  sticky?: boolean;
  queryParameterName: string;
  query: ParsedUrlQuery;
}

const InfoBar: FunctionComponent<InfoBarProps> = ({
  contents,
  sticky,
  queryParameterName,
  query,
}) => {
  // const { showModal, playAnimation, handleModal } = useAnimateModal(250);
  // useEffect(() => {
  //   if (contents.length === 0 && showModal) {
  //     handleModal();
  //   } else if (contents.length !== 0 && !showModal) {
  //     handleModal();
  //   }
  // }, [contents]);
  return (
    <IInfoBar
      contents={contents}
      queryParameterName={queryParameterName}
      query={query}
      showBar={true}
      sticky={sticky}
    />
  );
};

export default InfoBar;
