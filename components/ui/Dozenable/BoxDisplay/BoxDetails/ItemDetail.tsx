import { useBuildBox } from "@_providers/Dozenable/BuildBox";
import { Extra } from "@_types/database/cart";
import { getExtraString } from "@_utils/database/cart/cart";
import Amount from "components/ui/Checkout/Order/Items/Amount";

import { FunctionComponent } from "react";
import classes from "./ItemDetail.module.css";

interface ItemDetailProps {
  name: string;
  itemId: string;
  extras: Extra[] | [null];
  amount: number;
}

const ItemDetail: FunctionComponent<ItemDetailProps> = ({
  name,
  itemId,
  extras,
  amount,
}) => {
  const { dispatchBox, box } = useBuildBox();
  const updateAmount = (updateAmount: number) => {
    dispatchBox({ type: "Update", itemId, amount: updateAmount });
    console.log(`Update ${name} for ${amount}`);
  };
  const info = getExtraString(extras);
  return (
    <div className={classes.item_detail}>
      <div className={classes.info}>
        <h2>{name}</h2>
        <p>{info}</p>
      </div>
      <div className={classes.amount}>
        <Amount
          amount={amount}
          getUpdatedAmount={updateAmount}
          disabledMinus={box.currentCount === 0}
          disabledPlus={box.boxSize === box.currentCount}
        />
      </div>
    </div>
  );
};

export default ItemDetail;
