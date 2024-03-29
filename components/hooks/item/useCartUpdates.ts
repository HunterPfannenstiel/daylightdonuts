import { useCart } from "@_providers/old-cart/optimistic";
import { NO_GROUP } from "@_providers/old-cart/utils";
import { Item } from "@_types/database/menu";
import { getCartId, getExtraInfo } from "@_utils/database/cart/cart";
import { addItemToCart } from "@_utils/database/cart/modifiers/utils";
import useExtraInfo from "./useExtraInfo";

const useCartUpdates = (item: Item) => {
  const { modifyCart, nextItemId, incrementId, cart } = useCart();
  const { extraInfo, updateExtras } = useExtraInfo();

  const updateCart = (amount: number, price: number, extraPrice: boolean) => {
    const [ids, extras] = getExtraInfo(extraInfo);
    if (cart) {
      let { group_name, group_size, group_price } = item;
      const itemId = getCartId(item.id, ids);
      if (extraPrice || !group_name) {
        group_name = NO_GROUP;
        group_size = 0;
        group_price = "0";
      }
      let addItem = {
        name: item.name,
        id: item.id,
        amount,
        unitPrice: price,
        image: item.image_urls[0],
        extras,
        availability: item.availability,
      };
      const [cartMod, dbMod] = addItemToCart(
        group_name,
        group_size!,
        +group_price!,
        addItem,
        itemId,
        cart,
        nextItemId,
        ids,
        incrementId
      );
      modifyCart(cartMod, dbMod, 1250);
    }
  };

  return {
    updateCart,
    extraInfo,
    updateExtras,
  };
};

export default useCartUpdates;
