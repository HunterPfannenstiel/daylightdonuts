import { FunctionComponent } from "react";
import classes from "./index.module.css";
import Heading from "components/ui/Reusable/Heading";
import ImageComponent from "components/ui/Reusable/Image/ImageComponent";
import SocialIcons from "./SocialIcons";

interface SocialProps {}

const Social: FunctionComponent<SocialProps> = () => {
  return (
    <div className={classes.container}>
      <Heading position="center">
        <h2>Follow the Deliciousness!</h2>
      </Heading>
      <p>
        Stay up to date with Hutchinson Daylight Donuts by following us on
        social media!
      </p>
      <SocialIcons />
      <div className={classes.images}>
        <ImageComponent src="/Images/Social.png" fill />
        <ImageComponent src="/Images/Social.png" fill />
        <ImageComponent src="/Images/Social.png" fill />
      </div>
    </div>
  );
};

export default Social;
