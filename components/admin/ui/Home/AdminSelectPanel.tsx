import { FunctionComponent, ReactNode } from 'react';
import classes from './AdminSelectPanel.module.css';

interface AdminSelectPanelProps {
	display?: ReactNode;
}

const AdminSelectPanel: FunctionComponent<AdminSelectPanelProps> = ({
	display,
}) => {
	return <div className={classes.display_container}>{display}</div>;
};

export default AdminSelectPanel;
