"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { buildLabel, previewLabel } from "@_utils/dymo";
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
    <>
      <h1>Heloo Home page</h1>
      <button
        onClick={() => {
          const img = buildLabel(categories);
          setPreview(img);
        }}
      >
        CLick
      </button>
      {preview && <Image src={preview} alt="" width={324} height={100} />}
    </>
  );
};

const categories: LabelSection[] = [
  {
    name: "Glaze",
    amount: 24,
    breakdown: [
      {
        extras: [
          { category: "Topping", extra: "Peanuts", abbreviation: "Nuts" },
        ],
        amount: 12,
      },
      {
        extras: [
          { category: "Frosting", extra: "Chocolate", abbreviation: "Choc." },
        ],
        amount: 12,
      },
    ],
  },
];

export default Home;
