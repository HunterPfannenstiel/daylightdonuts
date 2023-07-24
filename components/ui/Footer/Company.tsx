import { FunctionComponent } from "react";
import classes from "./Company.module.css";
import FooterSection from "./FooterSection";
import Link from "next/link";

interface CompanyProps {}

const Company: FunctionComponent<CompanyProps> = () => {
  return (
    <FooterSection title="Company" className={classes.info}>
      <Link href="/about-us">About Us</Link>
      <Link href="/locations">Locations</Link>
      <Link href="/jubs">Job Openings</Link>
      <Link href="/faq">FAQ</Link>
    </FooterSection>
  );
};

export default Company;
