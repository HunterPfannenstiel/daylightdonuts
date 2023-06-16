import { FunctionComponent } from 'react';
import classes from './MenuNavBar.module.css';
import Link from 'next/link';

interface MenuNavBarProps {}

const MenuNavBar: FunctionComponent<MenuNavBarProps> = () => {
	return (
		<ul className={classes.nav_bar}>
			<Link href={"menu?category=All"}>All</Link>
			<Link href={"menu?category=Featured"}>Featured</Link>
			<Link href={"menu?category=Donuts"}>Donuts</Link>
			<Link href={"menu?category=Savory"}>Savory</Link>
			<Link href={"menu?category=Drinks"}>Drinks</Link>
			<Link href={"menu?category=Dozenable"}>Dozenable</Link>
		</ul>
	);
};

export default MenuNavBar;
