import { FunctionComponent, useContext, useState } from 'react';
import classes from './UserInfoContainer.module.css';
import UserInfoModal from './UserInfoModal';
import useAnimateModal from '@_hooks/animation/useAnimateModal';
import UserInfoContext from '../../../providers/UserInfo/UserInfo';
import { UserInfo as UserInfoType } from '@_types/database/userInfo';
import UserInfoList from '@ui/Reusable/UserInfo/UserInfoList';

interface UserInfoContainerProps {}

const UserInfoContainer: FunctionComponent<UserInfoContainerProps> = () => {
	const modal = useAnimateModal(300);
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
		modal.handleModal();
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
			modal.handleModal();
			return res;
		} else {
			const res = info.favorite
				? await ctx.addInfo(info, favIdx)
				: await ctx.addInfo(info, null);
			if (info.favorite && res) favIdx = ctx.infos!.length - 1;
			setSelectedUserInfo(null);
			modal.handleModal();
			return res;
		}
	};

	return (
		<>
			{modal.showModal && (
				<UserInfoModal
					modalProps={modal.getModalProps()}
					onSubmitHandler={onSubmitHandler}
					info={selectedUserInfo}
					infoIdx={selectedUserInfo ? selectedUserInfo.infoIdx : null}
					deleteHandler={ctx.deleteInfo}
				/>
			)}
			<div className={classes.infos_container}>
				<div className={classes.container}>
					<h1 className={classes.title}>User Information</h1>
					<UserInfoList
						onSelectHandler={onSelectHandler}
						editable
						setFavIdx={(idx) => {
							if (idx === undefined) favIdx = null;
							else favIdx = idx;
						}}
					/>
					<div className={classes.btn_container}>
						<button
							className={classes.btn}
							onClick={() => onSelectHandler(null, -1)}
						>
							+ Add User
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfoContainer;
