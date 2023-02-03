import Search from "components/ui/svg/Search";
import { FunctionComponent } from "react";
import classes from "./HandleOrder.module.css";

interface HandleOrderProps {}

const HandleOrder: FunctionComponent<HandleOrderProps> = () => {
  const handleViewClick = () => {
    console.log("View");
  };
  return (
    <div className={classes.print}>
      <button>Print</button>
      <Search onClick={handleViewClick} />
    </div>
  );
};

export default HandleOrder;
