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
	const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfoType | null>(
		null
	);
	const ctx = useContext(UserInfoContext);

	const onSelectHandler = async (info?: UserInfoType) => {
		if (!info) setSelectedUserInfo(null);
		else setSelectedUserInfo(info);
		modal.handleModal();
	};

	const onSubmitHandler = async (info: UserInfoType) => {
		const res =
			info.id === -1 ? await ctx.addInfo(info) : await ctx.editInfo(info);
		if (info.favorite && res) {
			//update favIdx
		}
		setSelectedUserInfo(null);
		modal.handleModal();
		return res;
	};

	return (
		<>
			{modal.showModal && (
				<UserInfoModal
					modalProps={modal.getModalProps()}
					onSubmitHandler={onSubmitHandler}
					info={selectedUserInfo}
					deleteHandler={ctx.deleteInfo}
				/>
			)}
			<div className={classes.infos_container}>
				<div className={classes.container}>
					<h1 className={classes.title}>User Information</h1>
					<UserInfoList
						onSelectHandler={onSelectHandler}
						editable
						updateIdxMap={(infoId, i) => (ctx.idxMap[infoId] = i)}
					/>
					<div className={classes.btn_container}>
						<button className={classes.btn} onClick={() => onSelectHandler()}>
							+ Add User
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfoContainer;
