import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { Dispatch, FunctionComponent } from "react";
import BoxDetails from "./BoxDetails/BoxDetails";
import classes from "./IBoxDisplay.module.css";
import Buttons from "./Buttons";
import Header from "./Header";
import Stripes from "components/ui/Reusable/Stripes";
import Back from "components/ui/svg/Back";
import { BoxPayload, DozenBox } from "@_types/dozenable";

interface IBoxDisplayProps {
  box: DozenBox;
  boxFinished: boolean;
  onFinishBox: () => void;
  onClearBox: () => void;
  dispatchBox: Dispatch<BoxPayload>;
}

const IBoxDisplay: FunctionComponent<IBoxDisplayProps> = ({
  boxFinished,
  onFinishBox,
  onClearBox,
  box,
  dispatchBox,
}) => {
  const { showModal, playAnimation, handleModal } = useAnimateModal(300);
  const buttonName = showModal ? "Clear Box" : "View Box";

  const openClass =
    (showModal ? classes.open : "") +
    " " +
    (playAnimation ? classes.animate_out : "");
  const bgOpen =
    (showModal ? classes.bg_open : "") +
    " " +
    (playAnimation ? classes.animate_out : "");
  return (
    <>
      <div className={classes.box_display + " " + openClass}>
        <div className={classes.content}>
          <div className={classes.back + " " + openClass}>
            <Back backButtonHandler={handleModal} />
          </div>
          <BoxDetails
            showDetails={showModal}
            animateOut={playAnimation}
            submitBox={boxFinished}
            boxSize={box.boxSize}
            boxClassName={classes.box}
            listClassName={classes.item_list}
            box={box}
            dispatchBox={dispatchBox}
          />
          <Header
            itemAmount={box.currentCount}
            groupSize={box.boxSize}
            className={classes.header}
          />
          <Buttons
            leftName={buttonName}
            className={classes.buttons}
            onFinishBox={onFinishBox}
            onClearBox={onClearBox}
            onViewBox={handleModal}
            modalShown={showModal}
            disableFinish={boxFinished}
          />
        </div>
        <Stripes />
      </div>
      <div
        className={classes.background + " " + bgOpen}
        onClick={handleModal}
      />
    </>
  );
};

export default IBoxDisplay;
