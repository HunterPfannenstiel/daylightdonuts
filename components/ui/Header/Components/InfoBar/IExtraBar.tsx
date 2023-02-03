import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { FunctionComponent } from "react";
import classes from "./IExtraBar.module.css";

interface IExtraBarProps {
  contents: string[];
  queryParameterName: string;
  sticky?: boolean;
  query: ParsedUrlQuery;
  showBar: boolean;
  playAnimation: boolean;
}

const IExtraBar: FunctionComponent<IExtraBarProps> = ({
  contents,
  queryParameterName,
  sticky,
  query,
  showBar,
  playAnimation,
}) => {
  const param = query[queryParameterName];
  let extraBarClass = playAnimation ? classes.animate_out : "";
  if (showBar) {
    extraBarClass += sticky ? ` ${classes.sticky}` : "";
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
            return (
              <li key={i} className={className}>
                <Link
                  href={{
                    query: { ...query, [queryParameterName]: item },
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
