import { FunctionComponent, useRef } from 'react';
import classes from './UserInfo.module.css';
import { UserInfo } from '@_types/database/userInfo';
import SelectInput from '../Form/SelectInput';

interface UserInfoProps {
	info: UserInfo;
	onSelectHandler: (info: UserInfo) => void;
	showPhoneNumber?: boolean;
	editable?: boolean;
	selectedId?: number;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({
	info,
	onSelectHandler,
	showPhoneNumber = false,
	editable = false,
	selectedId,
}) => {
	const label = (
		<div className={classes.details}>
			<p className={classes.text}>{info.first_name}</p>
			<p className={classes.text}>
				{info.last_name + (info.favorite ? ' *' : ' ')}
			</p>
			{showPhoneNumber && <p className={classes.text}>{info.phone_number}</p>}
		</div>
	);

	return (
		<li className={classes.info}>
			{!editable ? (
				<SelectInput
					type="radio"
					handler={onSelectHandler.bind(this, info)}
					label={label}
					name="info"
					id={`info-${info.id}`}
					defaultChecked={info.id === selectedId}
				/>
			) : (
				label
			)}

			{editable && (
				<button
					onClick={onSelectHandler.bind(this, info)}
					className={classes.edit_info}
				>
					Edit Info
				</button>
			)}
		</li>
	);
};

export default UserInfo;
