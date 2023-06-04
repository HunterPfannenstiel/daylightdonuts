import { FunctionComponent } from 'react';
import classes from './UserInfo.module.css';
import { UserInfo } from '@_types/database/userInfo';

interface UserInfoProps {
	info: UserInfo;
	onClickHandler: (infoId: number) => void;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({
	info,
	onClickHandler,
}) => {
	return (
		<li className={classes.info} onClick={() => onClickHandler(info.id)}>
			<p>{info.first_name}</p>
			<p>{info.last_name}</p>
			<p>{info.phone_number}</p>
			<p>{info.favorite ? 'Favorite' : 'Not favorite'}</p>
		</li>
	);
};

export default UserInfo;
