import { FunctionComponent } from "react";
import classes from "./index.module.css";
import CheckoutContainer from "../../CheckoutContainer";
import OrderItem, { OrderItem as OrderItemT } from "./OrderItem";
import Footer from "./Footer";

interface OrderItemsProps {}

const OrderItems: FunctionComponent<OrderItemsProps> = () => {
  return (
    <CheckoutContainer header="My Box" footer={<Footer subtotal={1000.01} />}>
      <ul className={classes.items}>
        {items.map((item) => {
          return <OrderItem item={item} key={item.name} />;
        })}
      </ul>
    </CheckoutContainer>
  );
};

const items: OrderItemT[] = [
  {
    name: "Glaze1",
    price: 12.0,
    amount: 12,
    imageUrl: "/Images/Items/Glaze.png",
    description:
      "Peanut butter & Chocolate drizzle frosting\nPeanuts Topping\nBavarian Cream filling",
  },
  {
    name: "Glaze2",
    price: 12.0,
    amount: 12,
    imageUrl: "/Images/Items/Glaze.png",
    description:
      "Peanut butter & Chocolate drizzle frosting\nPeanuts Topping\nBavarian Cream filling",
  },
  {
    name: "Glaze3",
    price: 122.0,
    amount: 122,
    imageUrl: "/Images/Items/Glaze.png",
    description:
      "Peanut butter & Chocolate drizzle frosting\nPeanuts Topping\nBavarian Cream filling",
  },
];

export default OrderItems;
