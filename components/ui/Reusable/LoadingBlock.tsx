import { FunctionComponent } from "react";
import classes from "./LoadingBlock.module.css";

interface LoadingBlockProps {
  className?: string;
}

const LoadingBlock: FunctionComponent<LoadingBlockProps> = ({ className }) => {
  return <div className={classes.loading_block + " " + className} />;
};

export default LoadingBlock;
