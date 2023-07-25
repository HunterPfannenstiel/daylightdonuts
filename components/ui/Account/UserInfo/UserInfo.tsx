import { FunctionComponent, useRef } from 'react';
import classes from './UserInfo.module.css';
import { UserInfo } from '@_types/database/userInfo';

interface UserInfoProps {
	info: UserInfo;
	idx: number;
	onSelectHandler: (info: UserInfo, infoIdx: number) => void;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({
	info,
	idx,
	onSelectHandler,
}) => {
	return (
		<li className={classes.info} >
			<p className={classes.text}>{info.first_name}</p>
			<p className={classes.text}>{info.last_name}</p>
			{info.favorite && <p className={classes.favorite}>*</p>}
			<button onClick={() => onSelectHandler(info, idx)}>Edit Info</button>
		</li>
	);
};

export default UserInfo;

{/* <p>{info.favorite ? 'Favorite' : 'Not favorite'}</p>
<button onClick={() => onSelectHandler(info, idx)}>Select</button>
<button onClick={() => deleteHandler(idx)}>Del</button> */}