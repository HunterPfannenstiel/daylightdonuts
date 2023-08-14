import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { FunctionComponent } from "react";
import classes from "./IExtraBar.module.css";
import { ReadonlyURLSearchParams, usePathname } from "next/navigation";

interface IExtraBarProps {
  contents: string[];
  queryParameterName: string;
  sticky?: boolean;
  params: ReadonlyURLSearchParams | null;
  showBar: boolean;
  playAnimation: boolean;
}

const IExtraBar: FunctionComponent<IExtraBarProps> = ({
  contents,
  queryParameterName,
  sticky,
  params,
  showBar,
  playAnimation,
}) => {
  const pathname = usePathname();

  const param = params?.get(queryParameterName);
  let extraBarClass = playAnimation ? classes.animate_out : "";
  if (showBar) {
    extraBarClass += sticky ? ` ${classes.sticky}` : "";
    //[queryParameterName]: item
    return (
      <div className={`${classes.extrabar} ${extraBarClass}`}>
        <ul className={classes.extra_items}>
          {contents.map((item, i) => {
            let className = "";
            if (param === item) {
              className = classes.selected;
            } else if (!param && i === 0) {
              className = classes.selected;
            }
            //   <Link
            //   href={{
            //     query: { [queryParameterName]: item },
            //     pathname: "menu",
            //   }}
            // >
            return (
              <li key={i} className={className}>
                <Link
                  href={{
                    query:
                      (params?.toString() || "") +
                      `&${queryParameterName}=${item}`,
                    pathname,
                  }}
                >
                  <h3 className={classes.item}>{item}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
};

export default IExtraBar;
