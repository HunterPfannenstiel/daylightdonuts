import { MenuItemDetials } from "@_types/admin/forms";
import { useReducer } from "react";

const reducer = (
  state: MenuItemDetials,
  payload: { key: keyof MenuItemDetials; value: any }
) => {
  const copyState = { ...state };
  copyState.image = { ...state.image };
  copyState[payload.key] = payload.value;
  return copyState;
};

const useMenuItemDetails = (initialDetails?: MenuItemDetials) => {
  const [itemDetails, dispatchItemDetails] = useReducer(
    reducer,
    initialDetails || initialItemDetails
  );
  const updateItemDetails = (key: keyof MenuItemDetials, value: any) => {
    dispatchItemDetails({ key, value });
  };

  return { updateItemDetails, itemDetails };
};

export default useMenuItemDetails;

const initialItemDetails: MenuItemDetials = {
  image: { url: "" },
  name: "",
  price: "",
  description: "",
};
