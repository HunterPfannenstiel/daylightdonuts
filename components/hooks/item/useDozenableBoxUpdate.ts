import { useBuildBox } from "@_providers/Dozenable/BuildBox";
import { Item } from "@_types/database/menu";
import { DozenBoxItem } from "@_types/dozenable";
import { getCartId, getExtraInfo } from "@_utils/database/cart/cart";
import useExtraInfo from "./useExtraInfo";

const useDozenableBoxUpdate = (item: Item) => {
  const { dispatchBox, isItemInBox, amountNeeded } = useBuildBox();
  const { extraInfo, updateExtras } = useExtraInfo();

  const addItemToBox = (amount: number) => {
    const [ids, extras] = getExtraInfo(extraInfo);
    const itemId = getCartId(item.id, ids);
    if (isItemInBox(itemId)) {
      dispatchBox({ type: "Update", itemId, amount });
    } else {
      const boxItem: DozenBoxItem = {
        id: item.id,
        name: item.name,
        amount,
        unitPrice: item.price,
        extras,
        extraIds: ids,
        image: item.image,
        availability: item.availability,
      };
      dispatchBox({ type: "New", item: boxItem, itemId });
    }
  };

  return {
    addItemToBox,
    updateExtras,
    amountNeeded,
  };
};

export default useDozenableBoxUpdate;
