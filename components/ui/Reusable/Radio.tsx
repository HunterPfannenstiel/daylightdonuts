import {
  CSSProperties,
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import classes from "./Radio.module.css";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: string;
  icon?: ReactNode;
}

const Radio: FunctionComponent<RadioProps> = ({
  label,
  color,
  icon,
  ...rest
}) => {
  return (
    <div className={classes.radio}>
      <input
        {...rest}
        type="radio"
        id={label}
        name="radio"
        style={{ "--color": color } as CSSProperties}
      />
      <label htmlFor={label}>{label}</label>
      {icon}
    </div>
  );
};

export default Radio;
