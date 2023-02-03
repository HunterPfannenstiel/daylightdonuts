import { CSSProperties, FunctionComponent } from "react";
import classes from "./Stripes.module.css";

interface StripesProps {
  mobileRender?: boolean;
}

const Stripes: FunctionComponent<StripesProps> = ({ mobileRender }) => {
  // const stripes = {
  //   "--stripe-height": "14px",
  //   height: "calc(var(--stripe-height) * 4)",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "space-evenly",
  //   width: "100%",
  //   marginTop: "auto",
  // } as CSSProperties;
  const styles: CSSProperties = mobileRender ? { display: "flex" } : {};

  return (
    <div className={classes.stripes} style={styles}>
      <div className={classes.blue_stripe}></div>
      <div className={classes.yellow_stripe}></div>
    </div>
  );
};

export default Stripes;
