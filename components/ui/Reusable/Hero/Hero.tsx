import { FunctionComponent, useState } from "react";
import classes from "./Hero.module.css";
import Link from "next/link";
import Image from "next/image";
import Stripes from "./Stripes";
import { HeroContent } from "@_types/home";

interface HeroProps {
  content: HeroContent[];
}

const Hero: FunctionComponent<HeroProps> = ({ content }) => {
  //   const [selectedIndex, setSelectedIndex] = useState(0);
  const { headerText, descriptionText, button, image } = content[0];
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.text_content}>
          <h2>{headerText}</h2>
          {descriptionText && <p>{descriptionText}</p>}
          {button && (
            <Link href={button.link} className={classes.link}>
              {button.text}
            </Link>
          )}
        </div>
        <div className={classes.image_content}>
          <div className={classes.image_container}>
            {image && <Image src={image} alt="" fill />}
          </div>
          <div className={classes.circles}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <Stripes className={classes.stripe_left} />
      <Stripes className={classes.stripe_right} />
    </div>
  );
};

export default Hero;
