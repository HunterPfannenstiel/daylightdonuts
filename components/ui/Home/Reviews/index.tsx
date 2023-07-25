import { FunctionComponent } from "react";
import classes from "./Reviews.module.css";
import Heading from "components/ui/Reusable/Heading";
import ScrollList from "components/ui/Reusable/ScrollList";
import ReviewItem from "./ReviewItem";

export type Review = { name: string; date: string; review: string };

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: FunctionComponent<ReviewsProps> = ({ reviews }) => {
  return (
    <div>
      <Heading position="center">
        <h2>Hear from our Customers!</h2>
      </Heading>
      <ScrollList>
        {reviews.map((review) => {
          return <ReviewItem {...review} />;
        })}
      </ScrollList>
    </div>
  );
};

export default Reviews;
