import Search from "components/ui/svg/Search";
import { FunctionComponent } from "react";
import classes from "./HandleOrder.module.css";

interface HandleOrderProps {
  onClick: () => void;
  onPrintClick: () => void;
}

const HandleOrder: FunctionComponent<HandleOrderProps> = ({
  onClick,
  onPrintClick,
}) => {
  return (
    <div className={classes.print}>
      <button onClick={onPrintClick}>Print</button>
      <Search onClick={onClick} />
    </div>
  );
};

export default HandleOrder;
