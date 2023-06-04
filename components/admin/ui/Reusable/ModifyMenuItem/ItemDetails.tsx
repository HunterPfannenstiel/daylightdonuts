import { FunctionComponent } from "react";
import classes from "./ItemDetails.module.css";
import ImageInput from "../Form/ImageInput";
import { ItemImage, MenuItemDetails } from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";
import ImageModifications from "./ImageComponent/ImageModifications";
import TextInput from "@_admin-reuse/Form/TextInput";

//TEXT INPUTS

interface ItemDetailsProps {
  initialDetails: {
    name: string;
    price: string;
    description: string;
  };
  images: ItemImage[];
  addImages: (images: ItemImage[]) => void;
  updateHandler: (key: keyof MenuItemDetails, value: any) => void;
  swapImages: (indexOne: number, indexTwo: number) => void;
}

const ItemDetails: FunctionComponent<ItemDetailsProps> = ({
  initialDetails,
  images,
  addImages,
  updateHandler,
  swapImages,
}) => {
  return (
    <Fieldset>
      <ImageModifications
        addImages={addImages}
        images={images}
        swapImages={swapImages}
      />
      <TextInput
        inputId="item-name"
        label="Name"
        inputType="text"
        handler={(inputValue) => {
          updateHandler("name", inputValue);
        }}
        required
        defaultValue={initialDetails.name}
      />
      <TextInput
        inputId="item-price"
        label="Price"
        inputType="number"
        handler={(inputValue) => {
          updateHandler("price", inputValue);
        }}
        required
        defaultValue={initialDetails.price}
      />
      <TextInput
        inputId="item-description"
        label="Description"
        handler={(inputValue) => {
          updateHandler("description", inputValue);
        }}
        required
        defaultValue={initialDetails.description}
        isTextArea
      />
    </Fieldset>
  );
};

export default ItemDetails;
