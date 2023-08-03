import { FormEvent, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import Button from "@ui/Reusable/Button";

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
          <Button type="button" onClick={onPageTurn.bind(null, currPage - 1)}>
            {"<"}
          </Button>
        ) : (
          <div></div>
        )}
        <Button type="submit" hidden={currPage !== lastPage}>
          Submit
        </Button>
        {currPage !== lastPage ? (
          <Button type="button" onClick={onPageTurn.bind(null, currPage + 1)}>
            {">"}
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </form>
  );
};

export default Page;
