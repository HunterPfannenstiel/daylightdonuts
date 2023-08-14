import { FunctionComponent } from 'react';
import classes from './ReviewItem.module.css';
import Quote from 'components/ui/svg/Quote';
import { concatClassNames } from '@_utils/client';

interface ReviewItemProps {
	name: string;
	date: string;
	review: string;
	className?: string;
}

const ReviewItem: FunctionComponent<ReviewItemProps> = ({
	name,
	date,
	review,
	className = '',
}) => {
	return (
		<div className={concatClassNames(classes.review_item, className)}>
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
