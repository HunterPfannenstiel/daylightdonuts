import { FunctionComponent, useState } from "react";
import classes from "./LabelPreview.module.css";
import { LabelBlock } from "@_types/admin/orders";
import Image from "next/image";
import { getLabel } from "@_utils/dymo/format";

type LabelPreviewProps = {
  imageSrc: string;
  className?: string;
  onClick?: () => void;
};

const LabelPreview: FunctionComponent<LabelPreviewProps> = ({
  imageSrc,
  className,
  onClick,
}) => {
  const classN = !!className ? `${classes.label} ${className}` : classes.label;
  return (
    <div className={classes.label_container}>
      <div className={classN} onClick={onClick}>
        <Image src={imageSrc} alt="" width={648} height={200} />
      </div>
    </div>
  );
};

export default LabelPreview;
