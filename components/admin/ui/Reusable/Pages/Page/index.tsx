import { FormEvent, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import Button from "@ui/Reusable/Button";
import ArrowIcon from "@ui/svg/ArrowIcon";

interface PageProps {
  children: ReactNode;
  onSubmit: () => void;
  currPage: number;
  lastPage: number;
  onPageTurn: (nextPage: number) => void;
}

const Page: FunctionComponent<PageProps> = ({
  children,
  onSubmit,
  currPage,
  lastPage,
  onPageTurn,
}) => {
  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={formHandler} className={classes.page}>
      {children}
      <div className={classes.buttons}>
        {currPage !== 0 ? (
          <Button
            type="button"
            onClick={onPageTurn.bind(null, currPage - 1)}
            className={classes.left_button}
          >
            <ArrowIcon size="36" color="white" outline={false} />
          </Button>
        ) : (
          <div></div>
        )}
        <Button type="submit" hidden={currPage !== lastPage}>
          Submit
        </Button>
        {currPage !== lastPage ? (
          <Button
            type="button"
            onClick={onPageTurn.bind(null, currPage + 1)}
            className={classes.right_button}
          >
            <ArrowIcon size="36" color="white" outline={false} />
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </form>
  );
};

export default Page;
