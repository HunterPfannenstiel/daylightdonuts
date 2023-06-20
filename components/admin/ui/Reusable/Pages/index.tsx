import { FunctionComponent, ReactNode, useState } from "react";
import classes from "./index.module.css";
import Page from "./Page";

interface PagesProps {
  pages: ReactNode[];
  submitHandler: () => void;
  beforePageTurn?: () => boolean;
}

const Pages: FunctionComponent<PagesProps> = ({
  pages,
  submitHandler,
  beforePageTurn,
}) => {
  const [currPage, setCurrPage] = useState(0);
  const pageTurn = (nextPage: number) => {
    if (!beforePageTurn) {
      setCurrPage(nextPage);
    } else if (beforePageTurn()) {
      setCurrPage(nextPage);
    }
  };
  return (
    <Page
      onSubmit={submitHandler}
      onPageTurn={pageTurn}
      currPage={currPage}
      lastPage={pages.length - 1}
    >
      {pages[currPage]}
    </Page>
  );
};

export default Pages;
