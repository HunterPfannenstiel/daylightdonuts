import Search from "components/ui/svg/Search";
import { FunctionComponent } from "react";
import classes from "./HandleOrder.module.css";

interface HandleOrderProps {
  onClick: () => void;
}

const HandleOrder: FunctionComponent<HandleOrderProps> = ({ onClick }) => {
  return (
    <div className={classes.print}>
      <button>Print</button>
      <Search onClick={onClick} />
    </div>
  );
};

export default HandleOrder;
