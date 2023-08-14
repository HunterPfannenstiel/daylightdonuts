'use client';
import { FunctionComponent } from 'react';
import { Metadata } from 'next';
import MenuPage from 'components/ui/Menu/MenuPage';
import PageNavBar from 'components/ui/Reusable/PageNavBar/PageNavBar';
import PageHeader from 'components/ui/Reusable/PageHeader';

export const metadata: Metadata = {
	title: 'Delicious Donuts - Menu | Daylight Donuts',
	description:
		'Choose through a wide variety of donuts and savory goods that are made fresh everyday',
};

interface MenuProps {}

const Menu: FunctionComponent<MenuProps> = () => {
	return (
		<>
			<PageHeader title="Menu" />
			<PageNavBar
				categories={[
					'All',
					'Featured',
					'Donuts',
					'Savory',
					'Drinks',
					'Dozenable',
				]}
				baseRoute="/menu"
				queryParameter="category"
			/>
			<MenuPage />
		</>
	);
};

export default Menu;
