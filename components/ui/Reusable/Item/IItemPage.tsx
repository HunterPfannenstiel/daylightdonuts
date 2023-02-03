import { Item } from "@_types/database/menu";
import Back from "components/ui/svg/Back";
import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";
import Stripes from "../Stripes";
import classes from "./IItemPage.module.css";

interface IItemPageProps {
  item: Item;
  itemForm: ReactNode;
  extraPrice: number;
  price: number;
  className?: string;
  backButtonHandler: () => void;
}

const IItemPage: FunctionComponent<IItemPageProps> = ({
  item,
  itemForm,
  extraPrice,
  price,
  className,
  backButtonHandler,
}) => {
  const image =
    item.image === "imageURL" ? "/Images/DAYLIGHTDONUTS.png" : item.image;
  return (
    <div className={classes.item + " " + className}>
      <div className={classes.item_content}>
        <div className={classes.back}>
          <Back backButtonHandler={backButtonHandler} />
        </div>
        <div className={classes.info}>
          <h2>{item.name}</h2>
          <p className={extraPrice ? classes.bold : ""}>{`$${price.toFixed(
            2
          )} / ea`}</p>
          {extraPrice ? (
            <p className={classes.extra_price}>{`+ $${extraPrice.toFixed(
              2
            )}`}</p>
          ) : (
            ""
          )}
        </div>
        <div className={classes.image_container}>
          <Image src={image} alt={item.name} width={500} height={500} />
        </div>
        <p className={classes.description}>{item.description}</p>
        {itemForm}
      </div>
      <Stripes />
    </div>
  );
};

export default IItemPage;
