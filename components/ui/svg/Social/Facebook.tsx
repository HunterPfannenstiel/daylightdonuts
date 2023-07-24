import { FunctionComponent } from "react";
import classes from "./Facebook.module.css";
import Link from "next/link";

interface FacebookProps {
  href: string;
  fill?: string;
}

const Facebook: FunctionComponent<FacebookProps> = ({
  href,
  fill = "#003472",
}) => {
  return (
    <Link href={href} target="_blank">
      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 367">
          <path
            id="Vector"
            d="M40.936 20.6711C40.936 9.35929 31.8228 0.19043 20.5788 0.19043C9.3349 0.19043 0.22168 9.35929 0.22168 20.6711C0.22168 30.8958 7.66425 39.3684 17.3977 40.9047V26.5923H12.2297V20.6697H17.3977V16.1586C17.3977 11.0259 20.4363 8.18943 25.0873 8.18943C27.313 8.18943 29.6445 8.58979 29.6445 8.58979V13.6302H27.0755C24.5471 13.6302 23.76 15.2099 23.76 16.8304V20.6711H29.4057L28.5032 26.5909H23.76V40.9047C33.4934 39.3684 40.936 30.8958 40.936 20.6711Z"
            fill={fill}
          />
        </g>
      </svg>
    </Link>
  );
};

export default Facebook;
