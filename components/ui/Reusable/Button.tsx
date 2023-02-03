import React, {
  ButtonHTMLAttributes,
  CSSProperties,
  FunctionComponent,
} from "react";
import classes from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  fontWeight?: string;
  width?: string;
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  color,
  children,
  fontWeight,
  width,
  ...rest
}) => {
  const css = { backgroundColor: color, fontWeight, width } as CSSProperties;
  return (
    <button {...rest} className={classes.button} style={css}>
      {children}
    </button>
  );
};

export default Button;
