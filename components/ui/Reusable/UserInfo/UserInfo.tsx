import { FunctionComponent, useRef } from 'react';
import classes from './UserInfo.module.css';
import { UserInfo } from '@_types/database/userInfo';
import SelectInput from '../Form/SelectInput';

interface UserInfoProps {
	info: UserInfo;
	idx: number;
	onSelectHandler: (info: UserInfo, infoIdx: number) => void;
	showPhoneNumber?: boolean;
	editable?: boolean;
	selectedInfo?: UserInfo;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({
	info,
	idx,
	onSelectHandler,
	showPhoneNumber = false,
	editable = false,
	selectedInfo
}) => {
	return (
		<li className={classes.info}>
			{!editable && (
				<SelectInput
					type="radio"
					handler={onSelectHandler.bind(this, info, idx)}
					label=""
					name="info"
					id="info"
					defaultChecked={info === selectedInfo}
				/>
			)}
			<p className={classes.text}>{info.first_name}</p>
			<p className={classes.text}>{info.last_name}</p>
			{showPhoneNumber && <p className={classes.text}>{info.phone_number}</p>}
			{info.favorite && <p className={classes.favorite}>*</p>}
			{editable && (
				<button
					onClick={onSelectHandler.bind(this, info, idx)}
					className={classes.edit_info}
				>
					Edit Info
				</button>
			)}
		</li>
	);
};

export default UserInfo;

{
	/* <p>{info.favorite ? 'Favorite' : 'Not favorite'}</p>
<button onClick={() => onSelectHandler(info, idx)}>Select</button>
<button onClick={() => deleteHandler(idx)}>Del</button> */
}
