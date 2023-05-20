import Link from "next/link";
import { FunctionComponent } from "react";
import classes from "./IInfoBar.module.css";
import { ReadonlyURLSearchParams, usePathname } from "next/navigation";

interface IInfoBarProps {
  contents: string[];
  queryParameterName: string;
  sticky?: boolean;
  params: ReadonlyURLSearchParams | null;
  showBar: boolean;
}

const IInfoBar: FunctionComponent<IInfoBarProps> = ({
  contents,
  queryParameterName,
  sticky,
  params,
  showBar,
}) => {
  const param = params?.get(queryParameterName);
  const pathname = usePathname();
  //   const infoBarClass = playAnimation ? classes.animate_out : "";
  if (showBar) {
    const className = sticky ? classes.sticky : "";
    return (
      <div className={classes.infobar + " " + className}>
        <ul className={classes.info_items}>
          {contents.map((item, i) => {
            let className;
            if (item === param) {
              className = classes.selected;
            } else if (!param && i === 0) {
              className = classes.selected;
            }
            return (
              <li key={i} className={className}>
                <Link
                  href={{
                    query: { [queryParameterName]: item },
                    pathname,
                  }}
                >
                  <h2 className={classes.item}>{item}</h2>
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

export default IInfoBar;
