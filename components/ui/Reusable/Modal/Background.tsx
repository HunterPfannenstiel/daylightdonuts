import { CSSProperties, FunctionComponent } from "react";
import classes from "./Background.module.css";

interface BackgroundProps {
  zIndex?: number;
  handleModal: () => void;
  playAnimation: boolean;
  animationTime: number;
  backgroundColor?: string;
  closeable?: boolean;
}

const Background: FunctionComponent<BackgroundProps> = ({
  zIndex,
  handleModal,
  playAnimation,
  animationTime,
  backgroundColor,
  closeable = true
}) => {
  const className = `${classes.background} ${
    playAnimation ? classes.animate_out : ""
  }`;
  return (
    <div
      className={className}
      style={
        {
          zIndex: zIndex,
          "--animation-time": `${animationTime}ms`,
          backgroundColor,
        } as CSSProperties
      }
      onClick={closeable ? handleModal : () => {}}
    />
  );
};

export default Background;
