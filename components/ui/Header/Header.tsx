import { findURLInfo, getPageName } from "@_utils/header/url";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import Info from "./Components/InfoBar/Info";
import Nav from "./Components/Nav";
import PageBar from "./Components/PageBar";
// import classes from "./Header.module.css";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { pathname, query } = useRouter();
  const info = findURLInfo(pathname);
  const pageName = getPageName(pathname);
  return (
    <>
      <Nav sticky={info.sticky} />
      <PageBar pageName={pageName} />
      <Info info={info} query={query} sticky={info.sticky} />
    </>
  );
};

export default Header;
