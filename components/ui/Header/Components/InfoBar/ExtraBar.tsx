import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { FunctionComponent, useEffect } from "react";
import IExtraBar from "./IExtraBar";
import { ReadonlyURLSearchParams } from "next/navigation";

interface ExtraBarProps {
  contents: string[];
  sticky?: boolean;
  queryParameterName: string;
  params: ReadonlyURLSearchParams | null;
  showBar: boolean;
}

const ExtraBar: FunctionComponent<ExtraBarProps> = ({
  contents,
  sticky,
  queryParameterName,
  params,
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
      params={params}
      queryParameterName={queryParameterName}
      showBar={showModal}
      playAnimation={playAnimation}
      sticky={sticky}
    />
  );
};

export default ExtraBar;
