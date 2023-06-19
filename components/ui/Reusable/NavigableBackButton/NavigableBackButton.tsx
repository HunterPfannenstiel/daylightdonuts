'use client';
import { FunctionComponent } from 'react';
import classes from './NavigableBackButton.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavigableBackButtonProps {}

const NavigableBackButton: FunctionComponent<NavigableBackButtonProps> = () => {
    const path = usePathname();
    if (path === '/') return <></>;

	const splitPath = path?.split('/');
    let buildString = '';


	return (
		<>
            <Link href={'/'}>Home</Link>
			{splitPath?.map((piece, index) => {
				buildString += index === splitPath.length - 1 ? piece : piece + '/';
				return (
					<Link href={buildString}>
						{piece.slice(0, 1).toUpperCase() + piece.slice(1)}
					</Link>
				);
			})}
		</>
	);
};

export default NavigableBackButton;
