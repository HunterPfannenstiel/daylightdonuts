'use client';

import useMenu from '@_hooks/menu/useMenu';
import { FunctionComponent } from 'react';
import MenuItemList from './MenuItemList';
import MenuNavBar from './MenuNavBar';
import classes from './MenuPage.module.css';

interface MenuPageProps {}

const MenuPage: FunctionComponent<MenuPageProps> = () => {
	const [menuItems, isLoading, query] = useMenu();
	return (
		<>
			<MenuItemList items={menuItems} category={query.category} />;
		</>
	);
};

export default MenuPage;

{/* <div className={classes.header_box}>
				<div className={classes.text_container}>
					<h1 className={classes.header}>Our Menu</h1>
				</div>
			</div> */}
