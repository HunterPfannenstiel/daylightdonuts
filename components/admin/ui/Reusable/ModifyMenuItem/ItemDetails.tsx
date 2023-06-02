import { FunctionComponent } from "react";
import classes from "./ItemDetails.module.css";
import ImageInput from "../Form/ImageInput";
import { ClientImage, MenuItemDetails } from "@_types/admin/forms";
import Fieldset from "../Form/Fieldset";

//TEXT INPUTS

interface ItemDetailsProps {
  initialDetails: {
    image: ClientImage;
    name: string;
    price: string;
    description: string;
  };
  updateHandler: (key: keyof MenuItemDetails, value: any) => void;
}

const ItemDetails: FunctionComponent<ItemDetailsProps> = ({
  initialDetails,
  updateHandler,
}) => {
  return (
    <Fieldset legend="Item Details">
      <ImageInput
        imageHandler={updateHandler.bind(null, "image")}
        initialImage={initialDetails.image}
        width={200}
        height={200}
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
