import { FunctionComponent, useContext } from 'react';
import UserInfoContext from '../../../providers/UserInfo/UserInfo';
import classes from './Logout.module.css';
import { signOut } from 'next-auth/react';

interface LogoutProps {}

const Logout: FunctionComponent<LogoutProps> = () => {
	const ctx = useContext(UserInfoContext);

	return (
		<div className={classes.container}>
			<button onClick={() => signOut()}>Logout of {ctx.email}</button>
		</div>
	);
};

export default Logout;
