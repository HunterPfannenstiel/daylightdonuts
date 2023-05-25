import { MenuItemDetials } from "@_types/admin/forms";
import useMenuItemDetails from "./useMenuItemDetails";
import { useRef } from "react";

const useCollectModalInfo = (
  selectedGroupId?: number,
  initialDetails?: MenuItemDetials
) => {
  const menuItemDetails = useRef<MenuItemDetials>(
    initialDetails || initialItemDetails
  );

  const selectedGroupingId = useRef<number | undefined>(selectedGroupId);

  const updateItemDetails = (key: keyof MenuItemDetials, value: any) => {
    menuItemDetails.current[key] = value;
  };

  const updateGroupingId = (id: number | undefined) => {
    selectedGroupingId.current = id;
  };

  return {
    menuItemDetails,
    updateItemDetails,
    selectedGroupingId,
    updateGroupingId,
  };
};

export default useCollectModalInfo;

const initialItemDetails: MenuItemDetials = {
  image: { url: "" },
  name: "",
  price: "",
  description: "",
};
