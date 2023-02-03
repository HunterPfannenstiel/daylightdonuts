import { FunctionComponent } from "react";
import classes from "./Back.module.css";

interface BackProps {
  backButtonHandler: () => void;
}

const Back: FunctionComponent<BackProps> = ({ backButtonHandler }) => {
  return (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={backButtonHandler}
    >
      <path
        d="M11 20L2 11L11 2"
        stroke="#003472"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.25 11H21.5"
        stroke="#003472"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Back;
