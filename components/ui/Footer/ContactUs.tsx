import { FunctionComponent } from "react";
import classes from "./ContactUs.module.css";
import FooterSection from "./FooterSection";
import { Location } from "@_types/database/checkout";

interface ContactUsProps {
  location: Location;
  email: string;
}

const ContactUs: FunctionComponent<ContactUsProps> = ({ location, email }) => {
  return (
    <FooterSection title="Contact Us" className={classes.info}>
      <p>{location.phone_number}</p>
      <p>{email}</p>
      <p>{location.address}</p>
      <p>
        {location.city}, {location.state} {location.zip}
      </p>
    </FooterSection>
  );
};

export default ContactUs;
