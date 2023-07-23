import { FunctionComponent } from "react";
import classes from "./ReviewItem.module.css";
import Quote from "components/ui/svg/Quote";

interface ReviewItemProps {
  name: string;
  date: string;
  review: string;
}

const ReviewItem: FunctionComponent<ReviewItemProps> = ({
  name,
  date,
  review,
}) => {
  return (
    <div className={classes.review_item}>
      <div>
        <p className={classes.name}>{name}</p>
        <p>{date}</p>
      </div>
      <Quote />
      <p className={classes.review}>{review}</p>
    </div>
  );
};

export default ReviewItem;
