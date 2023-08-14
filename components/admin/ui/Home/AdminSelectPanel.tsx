import { FunctionComponent, ReactNode } from 'react';
import classes from './AdminSelectPanel.module.css';
import Link from 'next/link';

interface AdminSelectPanelProps {
	href: string;
	label?: string;
	children?: ReactNode;
}

const AdminSelectPanel: React.FC<AdminSelectPanelProps> = ({
	href,
	label,
	children,
}) => {
	return (
		<div className={classes.container}>
			{label && <p style={{ textAlign: 'center' }}>{label}</p>}
			<Link href={href}>
				<div className={classes.display_container}>{children}</div>
			</Link>
		</div>
	);
};

export default AdminSelectPanel;
