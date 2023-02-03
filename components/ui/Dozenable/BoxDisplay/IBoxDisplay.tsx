import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { FunctionComponent, useState } from "react";
import BoxDetails from "./BoxDetails/BoxDetails";
import classes from "./IBoxDisplay.module.css";
import Buttons from "./Buttons";
import Header from "./Header";
import Stripes from "components/ui/Reusable/Stripes";
import Back from "components/ui/svg/Back";

interface IBoxDisplayProps {
  boxSize: number;
  boxFinished: boolean;
  itemsInBox: number;
  onFinishBox: () => void;
  onClearBox: () => void;
}

const IBoxDisplay: FunctionComponent<IBoxDisplayProps> = ({
  boxSize,
  boxFinished,
  itemsInBox,
  onFinishBox,
  onClearBox,
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
            boxSize={boxSize}
            boxClassName={classes.box}
            listClassName={classes.item_list}
          />
          <Header
            itemAmount={itemsInBox}
            groupSize={boxSize}
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
      <div className={classes.background + " " + bgOpen} />
    </>
  );
};

export default IBoxDisplay;
