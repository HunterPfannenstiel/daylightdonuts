import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { ParsedUrlQuery } from "querystring";
import { FunctionComponent, useEffect } from "react";
import IExtraBar from "./IExtraBar";

interface ExtraBarProps {
  contents: string[];
  sticky?: boolean;
  queryParameterName: string;
  query: ParsedUrlQuery;
  showBar: boolean;
}

const ExtraBar: FunctionComponent<ExtraBarProps> = ({
  contents,
  sticky,
  queryParameterName,
  query,
  showBar,
}) => {
  const { showModal, playAnimation, handleModal } = useAnimateModal(250);
  useEffect(() => {
    if (!showBar && showModal) {
      handleModal();
    } else if (showBar && !showModal) {
      handleModal();
    }
  }, [showBar]);

  return (
    <IExtraBar
      contents={contents}
      query={query}
      queryParameterName={queryParameterName}
      showBar={showModal}
      playAnimation={playAnimation}
      sticky={sticky}
    />
  );
};

export default ExtraBar;
