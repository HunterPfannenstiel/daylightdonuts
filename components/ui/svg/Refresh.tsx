import { FunctionComponent, HTMLAttributes } from "react";
import classes from "./Refresh.module.css";

interface RefreshProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Refresh: FunctionComponent<RefreshProps> = ({
  className,
  ...attributes
}) => {
  return (
    <div {...attributes} className={classes.refresh + " " + className}>
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.2689 8.73101C22.2751 6.73726 19.5389 5.49976 16.5001 5.49976C10.4226 5.49976 5.51389 10.4223 5.51389 16.4998C5.51389 22.5773 10.4226 27.4998 16.5001 27.4998C21.6289 27.4998 25.9051 23.9935 27.1289 19.2498H24.2689C23.1414 22.4535 20.0889 24.7498 16.5001 24.7498C11.9489 24.7498 8.25014 21.051 8.25014 16.4998C8.25014 11.9485 11.9489 8.24976 16.5001 8.24976C18.7826 8.24976 20.8176 9.19851 22.3026 10.6973L17.8751 15.1248H27.5001V5.49976L24.2689 8.73101Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Refresh;
