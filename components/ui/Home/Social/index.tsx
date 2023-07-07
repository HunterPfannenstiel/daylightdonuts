import { FunctionComponent } from "react";
import classes from "./index.module.css";
import Heading from "components/ui/Reusable/Heading";
import ImageComponent from "components/ui/Reusable/Image/ImageComponent";

interface SocialProps {}

const Social: FunctionComponent<SocialProps> = () => {
  return (
    <div className={classes.container}>
      <Heading
        headingNode={<h2>Follow the Deliciousness!</h2>}
        position="center"
      />
      <p>
        Stay up to date with Hutchinson Daylight Donuts by following us on
        social media!
      </p>
      <div className={classes.images}>
        <ImageComponent src="/Images/Social.png" width={200} height={200} />
        <ImageComponent src="/Images/Social.png" width={200} height={200} />
        <ImageComponent src="/Images/Social.png" width={200} height={200} />
      </div>
    </div>
  );
};

export default Social;
