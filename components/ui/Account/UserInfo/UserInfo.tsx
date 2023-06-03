import { FunctionComponent } from 'react';
import classes from './UserInfo.module.css';
import { Info } from '@_types/database/userInfo';

interface UserInfoProps {
	info: Info;
	favoriteId: number | null;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({ info, favoriteId }) => {
	return (
		<li className={classes.info}>
			<p>{info.first_name}</p>
			<p>{info.last_name}</p>
			<p>{info.phone_number}</p>
			<p>{favoriteId === info.id ? 'Favorite' : 'Not favorite'}</p>
		</li>
	);
};

export default UserInfo;
