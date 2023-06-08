import { FunctionComponent, useState } from "react";
import classes from "./LabelPreview.module.css";
import { LabelBlock } from "@_types/admin/orders";
import Image from "next/image";
import { getLabel } from "@_utils/dymo/format";

type LabelPreviewProps =
  | {
      imageSrc?: undefined;
      storeName: string;
      customerName: string;
      date: string;
      time: string;
      labelBlocks: LabelBlock[];
    }
  | {
      imageSrc: string;
      storeName?: undefined;
      customerName?: undefined;
      date?: undefined;
      time?: undefined;
      labelBlocks?: undefined;
    };

const LabelPreview: FunctionComponent<LabelPreviewProps> = ({
  storeName,
  customerName,
  date,
  time,
  labelBlocks,
  imageSrc,
}) => {
  if (imageSrc === undefined) {
    imageSrc = `data:image/png;base64,${getLabel(
      storeName,
      customerName,
      date,
      time,
      labelBlocks
    ).render()}`;
  }

  return (
    <div className={classes.label}>
      <Image src={imageSrc} alt="" width={648} height={200} />
    </div>
  );
};

export default LabelPreview;
