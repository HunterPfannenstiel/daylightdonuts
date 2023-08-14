import { FunctionComponent } from "react";
import classes from "./ItemGroupingDetails.module.css";
import { ItemGroupingDetails as IGD } from "@_hooks/admin/menu/item-grouping/useCollectItemGroupingInfo";
import Fieldset from "@_admin-reuse/Form/Fieldset";
import TextInput from "components/ui/Reusable/Form/TextInput";
import PriceInput from "@_admin-reuse/Form/Inputs/PriceInput";
import ImageInput from "@_admin-reuse/Form/Inputs/ImageInput";
import { ItemImage } from "@_types/admin/forms";
import Image from "next/image";

interface ItemGroupingDetailsProps {
  initialDetails: IGD;
  image: string;
  updateDetails: (key: keyof IGD, value: any) => void;
  updateImage: (image: ItemImage) => void;
}

const ItemGroupingDetails: FunctionComponent<ItemGroupingDetailsProps> = ({
  initialDetails,
  image,
  updateDetails,
  updateImage,
}) => {
  return (
    <Fieldset legend="What does this legend look like?">
      <TextInput
        label="Name"
        id="name"
        handler={(name) => {
          updateDetails("name", name);
        }}
        defaultValue={initialDetails.name}
      />
      <PriceInput
        label="Price"
        inputId="price"
        handler={(price) => {
          updateDetails("price", price);
        }}
        defaultValue={initialDetails.price}
      />
      <TextInput
        label="Size"
        id="size"
        inputType="number"
        handler={(size) => {
          updateDetails("size", size);
        }}
        defaultValue={initialDetails.size}
      />
      <ImageInput singleImageHandler={updateImage} multiple={false} />
      {image && <Image src={image} alt="" width={50} height={50} />}
    </Fieldset>
  );
};

export default ItemGroupingDetails;
