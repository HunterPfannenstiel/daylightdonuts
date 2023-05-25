import { FunctionComponent } from "react";
import classes from "./ItemDetails.module.css";
import ImageInput from "../Form/ImageInput";
import { ClientImage } from "@_types/admin/forms";

type Key = "name" | "price" | "description" | "image";
interface ItemDetailsProps {
  image: ClientImage;
  name: string;
  price: string;
  description: string;
  updateHandler: (key: Key, value: any) => void;
}

const ItemDetails: FunctionComponent<ItemDetailsProps> = ({
  image,
  name,
  price,
  description,
  updateHandler,
}) => {
  return (
    <fieldset>
      <ImageInput
        imageHandler={updateHandler.bind(null, "image")}
        initialImage={image}
      />
      <div>
        <label htmlFor="item-name">Name</label>
        <input
          type="text"
          id="item-name"
          onChange={(e) => {
            updateHandler("name", e.target.value);
          }}
          value={name}
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
          value={price}
        />
      </div>
      <div>
        <label htmlFor="item-description">Description</label>
        <textarea
          id="item-description"
          onChange={(e) => {
            updateHandler("description", e.target.value);
          }}
          value={description}
        />
      </div>
    </fieldset>
  );
};

export default ItemDetails;
