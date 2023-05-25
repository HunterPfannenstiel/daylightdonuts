import { FunctionComponent } from "react";
import classes from "./ItemDetails.module.css";
import ImageInput from "../Form/ImageInput";
import { ClientImage, MenuItemDetials } from "@_types/admin/forms";
import useMenuItemDetails from "@_hooks/admin/menu/useMenuItemDetails";

interface ItemDetailsProps {
  initialDetails: {
    image: ClientImage;
    name: string;
    price: string;
    description: string;
  };
  updateHandler: (key: keyof MenuItemDetials, value: any) => void;
}

const ItemDetails: FunctionComponent<ItemDetailsProps> = ({
  initialDetails,
  updateHandler,
}) => {
  // const { itemDetails, updateItemDetails } = useMenuItemDetails(initialDetails);
  const updateDetails = (key: keyof MenuItemDetials, value: any) => {
    updateHandler(key, value); //store value in a localized ref
    // updateItemDetails(key, value); //update state to display changes
  };
  return (
    <fieldset>
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
          defaultValue={initialDetails.description}
          // value={itemDetails.description}
        />
      </div>
    </fieldset>
  );
};

export default ItemDetails;
