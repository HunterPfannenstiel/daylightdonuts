import { FunctionComponent, ReactNode, useState } from "react";
import classes from "./index.module.css";
import Page from "./Page";

interface PagesProps {
  pages: ReactNode[];
  submitHandler: () => void;
}

const Pages: FunctionComponent<PagesProps> = ({ pages, submitHandler }) => {
  const [currPage, setCurrPage] = useState(0);
  return (
    <Page
      onSubmit={submitHandler}
      onPageTurn={setCurrPage}
      currPage={currPage}
      lastPage={pages.length - 1}
    >
      {pages[currPage]}
    </Page>
  );
};

export default Pages;
