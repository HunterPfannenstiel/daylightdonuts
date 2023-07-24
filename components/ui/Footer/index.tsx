import { FunctionComponent } from "react";
import classes from "./index.module.css";
import ContactUs from "./ContactUs";
import Company from "./Company";
import FollowUs from "./FollowUs";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        <ContactUs
          location={{
            location_id: 1,
            city: "Hutchinson",
            state: "KS",
            zip: "67502",
            address: "1435 East 30th Ave",
            phone_number: "(620) 500-5550",
            common_name: "30th Street Daylight Donuts",
          }}
          email="hutchinsondaylightdonuts@gmail.com"
        />
        <Company />
        <FollowUs />
      </div>
    </footer>
  );
};

export default Footer;

const location = [{}];
