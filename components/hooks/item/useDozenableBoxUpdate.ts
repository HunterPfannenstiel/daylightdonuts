import { Item } from "@_types/database/menu";
import { DozenBoxItem } from "@_types/dozenable";
import { getCartId, getExtraInfo } from "@_utils/database/cart/cart";
import useExtraInfo from "./useExtraInfo";
import useBuildBox from "./useBuildBox";
import { NewCartItemExtra } from "@_types/cart";
import { extraToString } from "@_providers/Cart/hooks/utils";

const useDozenableBoxUpdate = (
  groupName: string,
  boxPrice: number,
  boxSize: number
) => {
  const buildBox = useBuildBox(groupName, boxPrice, boxSize);
  const { extraInfo, updateExtras } = useExtraInfo();

  const addItemToBox = (amount: number, item: Item) => {
    const [ids, extras] = getExtraInfo(extraInfo);
    const itemId = getCartId(item.id, ids);
    if (buildBox.isItemInBox(itemId)) {
      buildBox.dispatchBox({ type: "Update", itemId, amount });
    } else {
      const boxItem: DozenBoxItem = {
        id: item.id,
        name: item.name,
        amount,
        unitPrice: +item.price,
        extras,
        image: item.image_urls[0],
      };
      buildBox.dispatchBox({ type: "New", item: boxItem, itemId });
    }
  };

  return {
    addItemToBox,
    updateExtras,
    ...buildBox,
  };
};

export default useDozenableBoxUpdate;
