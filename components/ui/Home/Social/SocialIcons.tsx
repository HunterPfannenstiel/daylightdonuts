import { FunctionComponent } from "react";
import classes from "./SocialIcons.module.css";
import Twitter from "components/ui/svg/Social/Twitter";
import Instagram from "components/ui/svg/Social/Instagram";
import Facebook from "components/ui/svg/Social/Facebook";

interface SocialIconsProps {}

const SocialIcons: FunctionComponent<SocialIconsProps> = () => {
  return (
    <ul className={classes.social_list}>
      <li>
        <Twitter href="https://twitter.com/home" />
      </li>
      <li>
        <Instagram href="https://www.instagram.com/30th_street_daylightdonuts/" />
      </li>
      <li>
        <Facebook href="https://www.facebook.com/HutchinsonDaylightDonuts" />
      </li>
    </ul>
  );
};

export default SocialIcons;
