import { FunctionComponent } from "react";
import classes from "./SocialIcons.module.css";
import Twitter from "components/ui/svg/Social/Twitter";
import Instagram from "components/ui/svg/Social/Instagram";
import Facebook from "components/ui/svg/Social/Facebook";

interface SocialIconsProps {
  fill?: string;
}

const SocialIcons: FunctionComponent<SocialIconsProps> = ({ fill }) => {
  return (
    <ul className={classes.social_list}>
      <li>
        <Twitter href="https://twitter.com/home" fill={fill} />
      </li>
      <li>
        <Instagram
          href="https://www.instagram.com/30th_street_daylightdonuts/"
          fill={fill}
        />
      </li>
      <li>
        <Facebook
          href="https://www.facebook.com/HutchinsonDaylightDonuts"
          fill={fill}
        />
      </li>
    </ul>
  );
};

export default SocialIcons;
