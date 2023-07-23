import { FunctionComponent } from 'react';
import classes from './PageHeader.module.css';

interface PageHeaderProps {
	title: string;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({ title }) => {
	return (
		<h1 className={classes.container}>{title}</h1>
	);
};

export default PageHeader;
