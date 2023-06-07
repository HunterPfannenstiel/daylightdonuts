import { FunctionComponent, useRef } from 'react';
import classes from './UserInfo.module.css';
import { UserInfo } from '@_types/database/userInfo';

interface UserInfoProps {
	info: UserInfo;
	idx: number;
	onClickHandler: (info: UserInfo) => void;
	deleteHandler: (infoId: number) => void;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({
	info,
	idx,
	onClickHandler,
	deleteHandler,
}) => {
	return (
		<li className={classes.info} >
			<p>{info.first_name}</p>
			<p>{info.last_name}</p>
			<p>{info.phone_number}</p>
			<p>{info.favorite ? 'Favorite' : 'Not favorite'}</p>
			<button onClick={() => onClickHandler(info)}>Select</button>
			<button onClick={() => deleteHandler(idx)}>Del</button>
		</li>
	);
};

export default UserInfo;
