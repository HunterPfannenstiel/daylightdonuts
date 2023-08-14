import { FunctionComponent } from "react";
import classes from "./CartIcon.module.css";
import Link from "next/link";

interface CartIconProps {}

const CartIcon: FunctionComponent<CartIconProps> = () => {
  return (
    <Link href={"/checkout"}>
      <svg
        width="38"
        height="28"
        viewBox="0 0 38 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classes.cart_icon}
      >
        <circle
          cx="10.4976"
          cy="10.4976"
          r="9.49763"
          fill="#003472"
          stroke="white"
          strokeWidth="2"
        />
        <circle
          cx="27.109"
          cy="10.4976"
          r="9.49763"
          fill="#003472"
          stroke="white"
          strokeWidth="2"
        />
        <circle
          cx="18.7461"
          cy="14.2471"
          r="11.7471"
          fill="#003472"
          stroke="white"
          strokeWidth="2"
        />
        <rect
          x="4.49902"
          y="19.4961"
          width="29.9932"
          height="5.99864"
          fill="#003472"
          stroke="#003472"
          strokeWidth="1.25"
        />
        <circle cx="18.7456" cy="14.2475" r="2.24949" fill="white" />
        <path
          d="M2.99903 18.746H34.7805M2.99903 18.746C2.99903 17.6501 3.63372 17.6501 3.63372 17.6501M2.99903 18.746V25.4945C2.99873 26.9942 2.99902 26.994 4.49869 26.9941H32.531C34.7805 26.9941 34.7805 26.9941 34.7805 25.4945V18.746M34.7805 18.746C34.7805 18.1692 35.0112 17.6501 34.2614 17.6501"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </Link>
  );
};

export default CartIcon;
