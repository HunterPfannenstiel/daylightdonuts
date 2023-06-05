import { FunctionComponent, useContext, useState } from 'react';
import classes from './UserInfoList.module.css';
import UserInfoContext from '../../../providers/UserInfo/UserInfo';
import UserInfo from './UserInfo';
import UserInfoModal from './UserInfoModal';
import { UserInfo as UserInfoType } from '@_types/database/userInfo';

interface UserInfoListProps {}

const UserInfoList: FunctionComponent<UserInfoListProps> = () => {
	const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfoType | null>(null);
	const ctx = useContext(UserInfoContext);

	const onClickHandler = async (info: UserInfoType | null) => {
		setSelectedUserInfo((prev) => {
			if (prev) return null;
			else return info;
		});
	};

	const onSubmitHandler = async (info: UserInfoType) => {
		if (info.id !== -1) {
			const res = await ctx.editInfo({ ...info, id: info.id });
			setSelectedUserInfo(null);
			return res;
		} else {
			const res = await ctx.addInfo(info);
			setSelectedUserInfo(null);
			return res;
		}
	};

	return (
		<>
			{selectedUserInfo && (
				<div className={classes.modal}>
					<UserInfoModal
						callback={onSubmitHandler}
						info={selectedUserInfo}
						exitHandler={() => onClickHandler(null)}
					/>
				</div>
			)}
			<div className={classes.container}>
				<h1>Stored Information</h1>
				<button onClick={() => onClickHandler(null)}>Add Information</button>
				<ul>
					{ctx.infos?.map((info) => (
						<UserInfo
							info={info}
							key={info.id}
							onClickHandler={onClickHandler}
							deleteHandler={ctx.deleteInfo}
						/>
					))}
				</ul>
			</div>
		</>
	);
};

export default UserInfoList;
