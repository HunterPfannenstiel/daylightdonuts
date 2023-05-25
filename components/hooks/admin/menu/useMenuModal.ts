import { MenuItemDetials } from "@_types/admin/forms";
import useMenuItemDetails from "./useMenuItemDetails";

const useMenuModal = (initialDetails?: MenuItemDetials) => {
  const { itemDetails, updateItemDetails } = useMenuItemDetails(initialDetails);

  return { itemDetails, updateItemDetails };
};

export default useMenuModal;
