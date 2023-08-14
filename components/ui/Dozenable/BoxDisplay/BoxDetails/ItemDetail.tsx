import { Extra } from "@_types/database/cart";
import { getExtraString } from "@_utils/database/cart/cart";
import Amount from "components/ui/Checkout/Order/Items/Amount";
import { Dispatch, FunctionComponent } from "react";
import classes from "./ItemDetail.module.css";
import { BoxPayload, DozenBox } from "@_types/dozenable";

interface ItemDetailProps {
  name: string;
  itemId: string;
  extras: Extra[] | [null];
  amount: number;
  box: DozenBox;
  dispatchBox: Dispatch<BoxPayload>;
}

const ItemDetail: FunctionComponent<ItemDetailProps> = ({
  name,
  itemId,
  extras,
  amount,
  box,
  dispatchBox,
}) => {
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
