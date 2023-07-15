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

	let favIdx: number | null = null;

	const onSelectHandler = async (
		info: UserInfoType | null,
		infoIdx: number
	) => {
		if (!info) setSelectedUserInfo(null);
		else setSelectedUserInfo({ ...info, infoIdx });
		setShowModal(true);
	};

	const onSubmitHandler = async (
		info: UserInfoType,
		infoIdx: number | null
	) => {
		if (infoIdx !== null) {
			const res = info.favorite
				? await ctx.editInfo(info, infoIdx, favIdx)
				: await ctx.editInfo(info, infoIdx, null);
			if (info.favorite && res) favIdx = infoIdx;
			setSelectedUserInfo(null);
			setShowModal(false);
			return res;
		} else {
			const res = info.favorite
				? await ctx.addInfo(info, favIdx)
				: await ctx.addInfo(info, null);
			if (info.favorite && res) favIdx = ctx.infos!.length - 1;
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
						deleteHandler={ctx.deleteInfo}
					/>
				</div>
			)}
			<div className={classes.container}>
				<p className={classes.title}>Saved Users</p>
				<ul className={classes.info_list}>
					{ctx.infos?.map((info, idx) => {
						if (info.favorite) favIdx = idx;
						return (
							<UserInfo
								info={info}
								key={info.id}
								idx={idx}
								onSelectHandler={onSelectHandler}
							/>
						);
					})}
				</ul>
				<button
					className={classes.btn}
					onClick={() => onSelectHandler(null, -1)}
				>
					+ Add User
				</button>
			</div>
		</>
	);
};

export default UserInfoList;
