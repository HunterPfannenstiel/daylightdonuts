import { FunctionComponent } from "react";
import classes from "./ItemDetails.module.css";
import { ItemImage, MenuItemDetails } from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";
import ImageModifications from "./ImageComponent/ImageModifications";
import TextInput from "components/ui/Reusable/Form/TextInput";
import TextArea from "@ui/Reusable/Form/TextArea";

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
  deleteImage: (index: number) => void;
}

const ItemDetails: FunctionComponent<ItemDetailsProps> = ({
  initialDetails,
  images,
  addImages,
  updateHandler,
  swapImages,
  deleteImage,
}) => {
  return (
    <Fieldset className={classes.details}>
      <ImageModifications
        deleteImage={deleteImage}
        addImages={addImages}
        images={images}
        swapImages={swapImages}
      />
      <TextInput
        id="item-name"
        label="Name"
        inputType="text"
        handler={(inputValue) => {
          updateHandler("name", inputValue);
        }}
        required
        defaultValue={initialDetails.name}
      />
      <TextInput
        id="item-price"
        label="Price"
        inputType="number"
        handler={(inputValue) => {
          updateHandler("price", inputValue);
        }}
        required
        defaultValue={initialDetails.price}
      />
      <TextArea
        id="item-description"
        label="Description"
        handler={(inputValue) => {
          updateHandler("description", inputValue);
        }}
        required
        defaultValue={initialDetails.description}
      />
    </Fieldset>
  );
};

export default ItemDetails;
