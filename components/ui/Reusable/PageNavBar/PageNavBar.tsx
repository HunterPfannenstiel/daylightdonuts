import { FunctionComponent, useState } from 'react';
import classes from './PageNavBar.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PageNavBarProps {
    categories: string[];
    baseRoute: string;
    queryParameter?: string;
}

const PageNavBar: FunctionComponent<PageNavBarProps> = ({ categories, baseRoute, queryParameter }) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
    queryParameter = queryParameter ? queryParameter : '';
	const params = useSearchParams();

	return (
		<ul className={classes.nav_bar}>
			{categories.map((category, index) => (
				<Link
					href={`${baseRoute}?${queryParameter}${category}`}
					className={params?.has(category) ? classes.selected : ''}
					onClick={setSelectedIndex.bind(this, index)}
				>
					{category}
				</Link>
			))}
		</ul>
	);
};

export default PageNavBar;
