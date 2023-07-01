import { FunctionComponent, useRef } from "react";
import classes from "./DymoDisplay.module.css";
import Modal from "components/ui/Reusable/Modal/Modal";
import LabelPreview from "../../Orders/OrderDetails/LabelPreview";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";
import { ModalProps } from "@_hooks/animation/useAnimateModal";

interface DymoDisplayProps {
  orderId: number;
  onTextStyleChange: (
    orderId: number,
    style: "Full Name" | "Abbreviation",
    showCategoryNames: boolean
  ) => void;
  modalProps: ModalProps;
  labelImage: string;
  abbreviate: boolean;
  showCategoryNames: boolean;
}

const DymoDisplay: FunctionComponent<DymoDisplayProps> = ({
  orderId,
  onTextStyleChange,
  modalProps,
  labelImage,
  abbreviate,
  showCategoryNames,
}) => {
  const includeCategoryRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const abbrevRef = useRef<HTMLInputElement>(null);
  const onInputChange = () => {
    let style: "Full Name" | "Abbreviation" = fullNameRef!.current!.checked
      ? "Full Name"
      : "Abbreviation";
    onTextStyleChange(orderId, style, includeCategoryRef.current!.checked);
  };
  return (
    <ModalDisplay modalProps={modalProps} className={classes.modal}>
      <form className={classes.form}>
        <div>
          <input
            type="checkbox"
            id="category"
            ref={includeCategoryRef}
            onChange={onInputChange}
            defaultChecked={showCategoryNames}
          />
          <label htmlFor="category">Include Category</label>
        </div>
        <div>
          <input
            type="radio"
            name="label"
            id="full-name"
            ref={fullNameRef}
            onChange={onInputChange}
            defaultChecked={!abbreviate}
          />
          <label htmlFor="full-name">Full Name</label>
        </div>
        <div>
          <input
            type="radio"
            name="label"
            id="abbrev"
            ref={abbrevRef}
            onChange={onInputChange}
            defaultChecked={abbreviate}
          />

          <label htmlFor="abbrev">Abbreviation</label>
        </div>
      </form>

      <LabelPreview imageSrc={labelImage} className={classes.label} />
    </ModalDisplay>
  );
};

export default DymoDisplay;

// if (imageSrc === undefined) {
//   imageSrc = `data:image/png;base64,${getLabel(
//     storeName,
//     customerName,
//     date,
//     time,
//     labelBlocks
//   ).render()}`;
// }
