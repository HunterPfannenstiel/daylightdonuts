import { FunctionComponent, HTMLAttributes } from "react";
import classes from "./AdminBack.module.css";

interface AdminBackProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

const AdminBack: FunctionComponent<AdminBackProps> = ({
  className,
  ...attributes
}) => {
  return (
    <div {...attributes} className={className} style={{ cursor: "pointer" }}>
      <svg
        width="25"
        height="17"
        viewBox="0 0 25 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.41621 15.8324L1 8.41621L8.41621 1"
          stroke="white"
          strokeWidth="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.03003 8.41602L23.4468 8.41602"
          stroke="white"
          strokeWidth="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default AdminBack;
