import { FunctionComponent, ReactNode, useState } from "react";
import classes from "./index.module.css";
import Page from "./Page";

interface PagesProps {
  pages: ReactNode[];
  submitHandler: () => void;
  beforePageTurn?: (currPage: number) => string | undefined;
}

const Pages: FunctionComponent<PagesProps> = ({
  pages,
  submitHandler,
  beforePageTurn,
}) => {
  const [currPage, setCurrPage] = useState(0);
  const [message, setMessage] = useState("");
  const pageTurn = (nextPage: number) => {
    if (!beforePageTurn) {
      setCurrPage(nextPage);
    } else {
      const msg = beforePageTurn(currPage);
      if (!msg) {
        setCurrPage(nextPage);
        setMessage("");
      } else setMessage(msg);
    }
  };
  console.log(message);
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
