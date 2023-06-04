import { FunctionComponent } from 'react';
import classes from './UserInfo.module.css';
import { UserInfo } from '@_types/database/userInfo';

interface UserInfoProps {
	info: UserInfo;
	onClickHandler: (infoId: number) => void;
	deleteHandler: (infoId: number) => void;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({
	info,
	onClickHandler,
	deleteHandler,
}) => {
	return (
		<li className={classes.info} >
			<p>{info.first_name}</p>
			<p>{info.last_name}</p>
			<p>{info.phone_number}</p>
			<p>{info.favorite ? 'Favorite' : 'Not favorite'}</p>
			<button onClick={() => onClickHandler(info.id)}>Select</button>
			<button onClick={() => deleteHandler(info.id)}>Del</button>
		</li>
	);
};

export default UserInfo;
