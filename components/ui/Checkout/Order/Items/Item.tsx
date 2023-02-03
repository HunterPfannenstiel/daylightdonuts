import { CSSProperties, FunctionComponent, ReactNode } from "react";
import Image from "next/image";
import Amount from "./Amount";
import classes from "./Item.module.css";

interface ItemProps {
  name: string;
  image?: string;
  info: ReactNode;
  amount: number;
  updateAmount: (newAmount: number) => void;
  price?: number;
  hideUnderline?: boolean;
  disabledButtons?: boolean;
}

const Item: FunctionComponent<ItemProps> = ({
  name,
  image,
  info,
  amount,
  updateAmount,
  price,
  hideUnderline,
  disabledButtons,
}) => {
  const style: CSSProperties = hideUnderline ? { border: "none" } : {};
  let showPrice = price ? price.toFixed(2) : "0.00";
  return (
    <div className={classes.item_info} style={style}>
      <div className={classes.item}>
        {image && (
          <div className={classes.image_container}>
            <Image src={image} width={100} height={100} alt={name} />
          </div>
        )}
        <div className={classes.info}>
          <p className={classes.name}>{name}</p>
          <div className={classes.extras}>{info}</div>
        </div>
      </div>
      <div className={classes.amount}>
        <Amount
          amount={amount}
          getUpdatedAmount={updateAmount}
          disabledMinus={disabledButtons}
          disabledPlus={disabledButtons}
        />
      </div>

      <div className={classes.price}>
        <p>{`$${showPrice}`}</p>
      </div>
    </div>
  );
};

export default Item;
