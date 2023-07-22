'use client';

import useMenu from '@_hooks/menu/useMenu';
import { FunctionComponent } from 'react';
import MenuItemList from './MenuItemList';
import MenuNavBar from './MenuNavBar';
import classes from './MenuPage.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

interface MenuPageProps {}

const MenuPage: FunctionComponent<MenuPageProps> = () => {
	const [menuItems, isLoading, query] = useMenu();
	const router = useRouter();
	const params = useSearchParams();

	if (!params?.get('category')) router.push('/menu?category=All');

	return (
		<>
			<MenuItemList items={menuItems} category={query.category} />;
		</>
	);
};

export default MenuPage;
