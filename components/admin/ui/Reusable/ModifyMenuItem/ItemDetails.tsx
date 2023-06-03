import { FunctionComponent } from "react";
import classes from "./ItemDetails.module.css";
import ImageInput from "../Form/ImageInput";
import { ItemImage, MenuItemDetails } from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";
import ImageModifications from "./ImageComponent/ImageModifications";

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
    <Fieldset legend="Item Details">
      <ImageModifications
        addImages={addImages}
        images={images}
        swapImages={swapImages}
      />
      <div>
        <label htmlFor="item-name">Name</label>
        <input
          type="text"
          id="item-name"
          onChange={(e) => {
            updateHandler("name", e.target.value);
          }}
          required
          defaultValue={initialDetails.name}
          // value={itemDetails.name}
        />
      </div>
      <div>
        <label htmlFor="item-price">Price</label>
        <input
          id="item-price"
          type="number"
          onChange={(e) => {
            updateHandler("price", e.target.value);
          }}
          required
          defaultValue={initialDetails.price}
          // value={itemDetails.price}
        />
      </div>
      <div>
        <label htmlFor="item-description">Description</label>
        <textarea
          id="item-description"
          onChange={(e) => {
            updateHandler("description", e.target.value);
          }}
          required
          defaultValue={initialDetails.description}
          // value={itemDetails.description}
        />
      </div>
    </Fieldset>
  );
};

export default ItemDetails;
