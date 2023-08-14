import { FunctionComponent, ReactNode } from "react";
import classes from "./ArrowIcon.module.css";

interface ArrowIconProps {
  size?: string;
  color?: string;
  outline?: boolean;
}

const ArrowIcon: FunctionComponent<ArrowIconProps> = ({
  size = "76",
  color = "#093B81",
  outline = true,
}) => {
  const Wrapper = outline
    ? ({ children }: { children: ReactNode }) => (
        <g id="Group 349">
          <circle
            id="Ellipse 31"
            cx="38"
            cy="37.5254"
            r="36"
            stroke={color}
            stroke-width="4"
          />
          {children}
        </g>
      )
    : ({ children }: { children: ReactNode }) => <>{children}</>;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Wrapper>
        <path
          id="Line 302"
          d="M24.5 36.5254C23.6716 36.5254 23 37.197 23 38.0254C23 38.8538 23.6716 39.5254 24.5 39.5254L24.5 36.5254ZM53.5607 39.086C54.1464 38.5003 54.1464 37.5505 53.5607 36.9647L44.0147 27.4188C43.4289 26.833 42.4792 26.833 41.8934 27.4188C41.3076 28.0046 41.3076 28.9543 41.8934 29.5401L50.3787 38.0254L41.8934 46.5107C41.3076 47.0965 41.3076 48.0462 41.8934 48.632C42.4792 49.2178 43.4289 49.2178 44.0147 48.632L53.5607 39.086ZM24.5 39.5254L52.5 39.5254L52.5 36.5254L24.5 36.5254L24.5 39.5254Z"
          fill={color}
        />
      </Wrapper>
    </svg>
  );
};

export default ArrowIcon;
