export type HeroContent = {
  headerText: string;
  descriptionText: string | null;
  button: { link: string; text: string } | null;
  image: string | null;
};

export type FeaturedItem = { name: string; image: string };
