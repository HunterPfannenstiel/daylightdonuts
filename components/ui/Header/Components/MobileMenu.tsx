import Link from "next/link";
import { FunctionComponent } from "react";
import classes from "./MobileMenu.module.css";

interface MobileMenuProps {
  showModal: boolean;
  playAnimation: boolean;
  handleModal: () => void;
}

const MobileMenu: FunctionComponent<MobileMenuProps> = ({
  showModal,
  playAnimation,
  handleModal,
}) => {
  if (showModal) {
    return (
      <div
        className={`${classes.menu} ${
          playAnimation ? classes.animate_out : ""
        }`}
      >
        <ul className={classes.links}>
          <li onClick={handleModal}>
            <Link href="/menu">Menu</Link>
          </li>
          <li onClick={handleModal}>
            <Link href="/checkout">Checkout</Link>
          </li>
          <li onClick={handleModal}>
            <p>Login</p>
          </li>
          <li></li>
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
};

export default MobileMenu;
