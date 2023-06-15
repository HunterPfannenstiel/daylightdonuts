"use client";

import { FunctionComponent } from "react";
import classes from "./Home.module.css";

declare global {
  interface Window {
    dymo: any;
  }
}

//DYMO Connect Service must be running to use the SDK

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return <h2>Admin Home</h2>;
};

export default Home;
