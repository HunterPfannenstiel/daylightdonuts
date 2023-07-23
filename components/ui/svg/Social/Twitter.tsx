import { FunctionComponent } from "react";
import classes from "./Twitter.module.css";
import Link from "next/link";

interface TwitterProps {
  href: string;
}

const Twitter: FunctionComponent<TwitterProps> = ({ href }) => {
  return (
    <Link href={href} target="_blank">
      <svg
        width="55"
        height="54"
        viewBox="0 0 55 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="icon/twitter">
          <path
            id="vector"
            d="M44.9722 17.8206C44.9996 18.2173 44.9996 18.614 44.9996 19.0144C44.9996 31.2137 35.7126 45.2831 18.7308 45.2831V45.2758C13.7144 45.2831 8.80214 43.8462 4.5791 41.1369C5.30853 41.2246 6.04162 41.2685 6.77654 41.2704C10.9338 41.274 14.9722 39.8791 18.2427 37.3106C14.2921 37.2356 10.8277 34.6597 9.61749 30.8992C11.0014 31.1661 12.4274 31.1113 13.7857 30.7402C9.47855 29.87 6.37983 26.0857 6.37983 21.6908C6.37983 21.6506 6.37983 21.6122 6.37983 21.5738C7.6632 22.2886 9.10013 22.6853 10.57 22.7292C6.51329 20.0181 5.26283 14.6214 7.71256 10.402C12.3999 16.1698 19.3158 19.6762 26.74 20.0473C25.9959 16.8407 27.0124 13.4806 29.4109 11.2265C33.1294 7.73105 38.9776 7.91021 42.4731 11.6268C44.5407 11.2192 46.5224 10.4605 48.336 9.38553C47.6467 11.5226 46.2043 13.338 44.2775 14.4916C46.1074 14.2758 47.8954 13.7859 49.5791 13.0382C48.3396 14.8956 46.7784 16.5135 44.9722 17.8206Z"
            fill="#003472"
          />
        </g>
      </svg>
    </Link>
  );
};

export default Twitter;