'use client';
import { FunctionComponent } from 'react';
import classes from './NavigableBackBar.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavigableBackBarProps {}

const NavigableBackBar: FunctionComponent<NavigableBackBarProps> = () => {
	const path = usePathname();
	if (path === '/') return <></>;

	const splitPath = path?.split('/');
	let buildString = '';

	return (
		<div className={classes.container}>
			<div className={classes.back_bar}>
				<Link href={'/'}>&lt; Home </Link>
				{splitPath?.map((piece, index) => {
					if (piece.length === 0) return;
					buildString += index === splitPath.length - 1 ? piece : piece + '/';
					const formattedPiece =
						' / ' + piece.slice(0, 1).toUpperCase() + piece.slice(1);
					if (index !== splitPath.length - 1) {
						return <Link href={buildString}>{formattedPiece + ' '}</Link>;
					} else return <p className={classes.last_piece}>{formattedPiece}</p>;
				})}
			</div>
		</div>
	);
};

export default NavigableBackBar;
