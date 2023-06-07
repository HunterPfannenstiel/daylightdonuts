import { FunctionComponent, useContext, useState } from 'react';
import classes from './UserInfoList.module.css';
import UserInfoContext from '../../../providers/UserInfo/UserInfo';
import UserInfo from './UserInfo';
import UserInfoModal from './UserInfoModal';
import { UserInfo as UserInfoType } from '@_types/database/userInfo';

interface UserInfoListProps {}

const UserInfoList: FunctionComponent<UserInfoListProps> = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedUserInfo, setSelectedUserInfo] = useState<
		({ infoIdx: number } & UserInfoType) | null
	>(null);
	const ctx = useContext(UserInfoContext);

	const onSelectHandler = async (
		info: UserInfoType | null,
		infoIdx: number
	) => {
		if (!info) setSelectedUserInfo(null);
		else setSelectedUserInfo({ ...info, infoIdx });
		setShowModal(true);
	};

	const onSubmitHandler = async (info: UserInfoType, infoIdx: number | null) => {
		if (infoIdx) {
			const res = await ctx.editInfo(info, infoIdx);
			setSelectedUserInfo(null);
			setShowModal(false);
			return res;
		} else {
			const res = await ctx.addInfo(info);
			setSelectedUserInfo(null);
			setShowModal(false);
			return res;
		}
	};

	return (
		<>
			{showModal && (
				<div className={classes.modal}>
					<UserInfoModal
						onSubmitHandler={onSubmitHandler}
						info={selectedUserInfo}
						infoIdx={selectedUserInfo ? selectedUserInfo.infoIdx : null}
						exitHandler={() => setShowModal(false)}
					/>
				</div>
			)}
			<div className={classes.container}>
				<h1>Stored Information</h1>
				<button onClick={() => onSelectHandler(null, -1)}>
					Add Information
				</button>
				<ul>
					{ctx.infos?.map((info, idx) => (
						<UserInfo
							info={info}
							key={info.id}
							idx={idx}
							onSelectHandler={onSelectHandler}
							deleteHandler={ctx.deleteInfo}
						/>
					))}
				</ul>
			</div>
		</>
	);
};

export default UserInfoList;
