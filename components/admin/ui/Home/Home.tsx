"use client";

import { FunctionComponent, useEffect, useState } from "react";
import classes from "./Home.module.css";
import Image from "next/image";
import { LabelSection } from "@_types/admin/orders";

declare global {
  interface Window {
    dymo: any;
  }
}

//DYMO Connect Service must be running to use the SDK

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [preview, setPreview] = useState<string>();
  useEffect(() => {
    if (window.dymo) window.dymo.label.framework.init();
  }, [window?.dymo]);
  return (
    <>{preview && <Image src={preview} alt="" width={324} height={100} />}</>
  );
};

export default Home;
