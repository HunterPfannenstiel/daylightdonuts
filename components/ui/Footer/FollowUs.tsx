import { FunctionComponent } from "react";
import classes from "./FollowUs.module.css";
import FooterSection from "./FooterSection";
import SocialIcons from "../Home/Social/SocialIcons";
import ImageComponent from "../Reusable/Image/ImageComponent";

interface FollowUsProps {}

const FollowUs: FunctionComponent<FollowUsProps> = () => {
  return (
    <FooterSection title="Follow Us">
      <SocialIcons fill="white" />
      <ImageComponent
        src="/Images/DAYLIGHTDONUTS.png"
        fill
        className={classes.image_container}
      />
    </FooterSection>
  );
};

export default FollowUs;
