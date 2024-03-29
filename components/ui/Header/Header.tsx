"use client";

import { findURLInfo, getPageName } from "@_utils/header/url";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import Info from "./Components/InfoBar/Info";
import Nav from "./Components/Nav";
import PageBar from "./Components/PageBar";
import NavigableBackBar from "../Reusable/NavigableBackButton/NavigableBackBar";
// import classes from "./Header.module.css";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const pathname = usePathname();
  const info = findURLInfo(pathname);
  const pageName = getPageName(pathname);
  return (
    <>
      <Nav sticky={info.sticky} />
      <NavigableBackBar />
      {/* <PageBar pageName={pageName} /> */}
      {/* <Info info={info} sticky={info.sticky} /> */}
    </>
  );
};

export default Header;
