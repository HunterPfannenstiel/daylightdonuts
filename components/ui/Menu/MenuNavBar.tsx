import { FunctionComponent, useState } from 'react';
import classes from './MenuNavBar.module.css';
import Link from 'next/link';

interface MenuNavBarProps {}

const categories = [
	'All',
	'Featured',
	'Donuts',
	'Savory',
	'Drinks',
	'Dozenable',
];

const MenuNavBar: FunctionComponent<MenuNavBarProps> = () => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	return (
		<ul className={classes.nav_bar}>
			{categories.map((category, index) => (
				<Link
					href={`menu?category=${category}`}
					className={selectedIndex === index ? classes.selected : ''}
					onClick={setSelectedIndex.bind(this, index)}
				>
					{category}
				</Link>
			))}
		</ul>
	);
};

export default MenuNavBar;
