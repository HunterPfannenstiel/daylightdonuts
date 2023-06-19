import { FormEvent, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";

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
    <form onSubmit={formHandler}>
      {children}
      <div className={classes.buttons}>
        {currPage !== 0 ? (
          <button type="button" onClick={onPageTurn.bind(null, currPage - 1)}>
            {"<"}
          </button>
        ) : (
          <div></div>
        )}
        <button type="submit" hidden={currPage !== lastPage}>
          Submit
        </button>
        {currPage !== lastPage ? (
          <button type="button" onClick={onPageTurn.bind(null, currPage + 1)}>
            {">"}
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </form>
  );
};

export default Page;
