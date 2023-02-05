import useAnimateButton from "@_hooks/animation/useAnimateButton";
import { CSSProperties, FunctionComponent, HTMLAttributes } from "react";
import classes from "./Arrow.module.css";

interface ArrowProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "Up" | "Down" | "Left" | "Right";
}

const Arrow: FunctionComponent<ArrowProps> = ({
  direction = "Up",
  className,
  ...props
}) => {
  const { buttonClick, playAnimation } = useAnimateButton(250);

  const { degree, transform } = getProperties(direction);
  const dir = {
    "--degree": degree,
    "--transform": transform,
  } as CSSProperties;
  return (
    <div
      className={`${classes.arrow} ${
        playAnimation ? classes.clicked : ""
      } ${className}`}
      {...props}
      onClick={(e) => {
        buttonClick();
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      style={dir}
    />
  );
};

type DirectionProperties = {
  degree: string;
  transform: string;
};

const getProperties = (
  direction: "Up" | "Down" | "Left" | "Right"
): DirectionProperties => {
  switch (direction) {
    case "Up":
      return { degree: "45deg", transform: "-10px" };
    case "Down":
      return { degree: "225deg", transform: "10px" };
    case "Left":
      return { degree: "135deg", transform: "-10px" };
    case "Right":
      return { degree: "315deg", transform: "-10px" };
  }
};

export default Arrow;
