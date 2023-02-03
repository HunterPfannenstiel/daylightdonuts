import { useCart } from "@_providers/cart/optimistic";
import { moneyToNum, NO_GROUP } from "@_providers/cart/utils";
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
      let { groupname, groupsize, dozenprice } = item;
      const itemId = getCartId(item.id, ids);
      if (extraPrice || !groupname) {
        groupname = NO_GROUP;
        groupsize = 0;
        dozenprice = "$0";
      }
      const dozenPrice = moneyToNum(dozenprice!);
      const modifiedPrice = extraPrice ? price : null;
      let addItem = {
        name: item.name,
        id: item.id,
        amount,
        unitPrice: price,
        image: item.image,
        extras,
        availability: item.availability,
      };
      const [cartMod, dbMod] = addItemToCart(
        groupname,
        groupsize!,
        dozenPrice,
        addItem,
        itemId,
        cart,
        nextItemId,
        ids,
        modifiedPrice,
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
