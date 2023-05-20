import { FunctionComponent } from "react";
import IInfoBar from "./IInfoBar";
import { ReadonlyURLSearchParams } from "next/navigation";

interface InfoBarProps {
  contents: string[];
  sticky?: boolean;
  queryParameterName: string;
  params: ReadonlyURLSearchParams | null;
}

const InfoBar: FunctionComponent<InfoBarProps> = ({
  contents,
  sticky,
  queryParameterName,
  params,
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
      params={params}
      showBar={true}
      sticky={sticky}
    />
  );
};

export default InfoBar;
