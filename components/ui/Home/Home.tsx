import { FunctionComponent } from "react";
import classes from "./HomePage.module.css";
import Hero from "../Reusable/Hero/Hero";
import { FeaturedItem, HeroContent } from "@_types/home";
import FeaturedSection from "./FeaturedSection/FeaturedSection";

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
      <FeaturedSection featuredItems={featuredItems} />
    </>
  );
};

export default HomePage;
