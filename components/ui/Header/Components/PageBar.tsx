import { FunctionComponent } from "react";
import classes from "./PageBar.module.css";

interface PageBarProps {
  pageName: string;
}

const PageBar: FunctionComponent<PageBarProps> = ({ pageName }) => {
  return (
    <div className={classes.pagebar}>
      <div className={classes.stripe}></div>
      <h1 className={classes.title}>{pageName}</h1>
    </div>
  );
};

export default PageBar;
