import { FeaturedItem, HeroContent } from "@_types/home";
import HomePage from "components/ui/Home/Home";
import { FunctionComponent } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return <HomePage heroContent={heroContent} featuredItems={featuredItems} />;
};

const heroContent: HeroContent[] = [
  {
    headerText: "Something to crow about since 1954.",
    descriptionText:
      "Open daily 5am to Noon. Stop by either of our two locations in Hutchinson and grab some donuts to go!",
    button: { link: "/menu", text: "Order Now!" },
    image:
      "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1673400244/item_images/fgvymicizcsmmwqgbgyh.png",
  },
];

const featuredItems: FeaturedItem[] = [
  {
    name: "Old Fashion",
    image:
      "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1673400244/item_images/fgvymicizcsmmwqgbgyh.png",
  },
  {
    name: "Glaze",
    image:
      "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1673400003/item_images/tjah32egdkq8idarjgkd.png",
  },
  {
    name: "Blueberry",
    image:
      "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1673400201/item_images/l7gfyvo8tps7zwdin4wn.png",
  },
];
export default Home;
