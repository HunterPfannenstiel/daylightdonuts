import { ItemImage } from "@_types/admin/forms";
import { GroupingSelections } from "@_types/admin/modify-menu";
import { useRef, useState } from "react";
import { InitialSelections } from "../modification/useSelections";

const useCollectItemGroupingInfo = (
  name: string,
  selections?: GroupingSelections
) => {
  const details = useRef(getInitialDetails(name, selections));

  const updateDetails = (key: keyof ItemGroupingDetails, value: any) => {
    details.current[key] = value as never;
  };

  const initialImageUrl = useRef(selections?.image || "");

  const [image, setImage] = useState<ItemImage>();

  const updateImage = (image: ItemImage) => {
    setImage(image);
  };

  const itemSelections = useRef(getInitialSelections(selections?.items));

  const updateItem = (id: number, _name: string, isSelected: boolean) => {
    if (isSelected) {
      itemSelections.current[id] = true;
    } else {
      delete itemSelections.current[id];
    }
  };

  return {
    details: details.current,
    updateDetails,
    imageUrl: image?.imageUrl || initialImageUrl.current,
    updateImage,
    itemSelections: itemSelections.current,
    imageBlob: image?.blob,
    updateItem,
  };
};

export default useCollectItemGroupingInfo;

export type ItemGroupingDetails = {
  name: string;
  price: string;
  size: string;
};

const getInitialDetails = (
  name: string,
  selections?: GroupingSelections
): ItemGroupingDetails => {
  return {
    name,
    price: selections?.price || "",
    size: selections?.size.toString() || "0",
  };
};

const getInitialSelections = (selections?: InitialSelections) => {
  if (selections) return { ...selections };
  return {};
};
