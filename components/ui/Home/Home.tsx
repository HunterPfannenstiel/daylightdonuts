import { FunctionComponent } from "react";
import classes from "./Home.module.css";
import Hero from "../Reusable/Hero/Hero";
import { FeaturedItem, HeroContent } from "@_types/home";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import Social from "./Social";

interface HomePageProps {
  heroContent: HeroContent[];
  featuredItems: FeaturedItem[];
}

const HomePage: FunctionComponent<HomePageProps> = ({
  heroContent,
  featuredItems,
}) => {
  return (
    <>
      <Hero content={heroContent} />
      <div className={classes.content}>
        <FeaturedSection featuredItems={featuredItems} />
        <Social />
      </div>
    </>
  );
};

export default HomePage;
