import { FunctionComponent } from "react";
import classes from "./Home.module.css";
import Hero from "../Reusable/Hero/Hero";
import { FeaturedItem, HeroContent } from "@_types/home";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import Social from "./Social";
import Reviews, { Review } from "./Reviews";
import { Location } from "@_types/database/checkout";
import Locations from "./Locations";

interface HomePageProps {
  heroContent: HeroContent[];
  featuredItems: FeaturedItem[];
  reviews: Review[];
  locations: Location[];
}

const HomePage: FunctionComponent<HomePageProps> = ({
  heroContent,
  featuredItems,
  reviews,
  locations,
}) => {
  return (
    <>
      <Hero content={heroContent} />
      <div className={classes.container}>
        <div className={classes.content}>
          <FeaturedSection featuredItems={featuredItems} />
          <Social />
          <Reviews reviews={reviews} />
          <Locations locations={locations} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
