import { FunctionComponent, useState } from 'react';
import classes from './PageNavBar.module.css';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ScrollList from '../ScrollList';

interface PageNavBarProps {
	categories: string[];
	baseRoute: string;
	queryParameter?: string;
	fallbackCategoryIdx?: number;
}

const PageNavBar: FunctionComponent<PageNavBarProps> = ({
	categories,
	baseRoute,
	queryParameter,
	fallbackCategoryIdx = 0,
}) => {
	const adjustedQueryParam = queryParameter ? queryParameter + '=' : '';
	const params = useSearchParams();

	const isOnCategory = (category: string) => {
		if (!queryParameter) return params?.has(category);
		else return params?.get(queryParameter!) === category;
	};

	return (
		<ul className={classes.nav_bar}>
			<ScrollList className={classes.scroll_list}>
				{categories.map((category) => (
					<Link
						href={`${baseRoute}?${adjustedQueryParam}${category}`}
						className={isOnCategory(category) ? classes.selected : ''}
					>
						{category}
					</Link>
				))}
			</ScrollList>
		</ul>
	);
};

export default PageNavBar;
