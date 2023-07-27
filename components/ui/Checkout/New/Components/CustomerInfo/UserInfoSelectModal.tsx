import { FunctionComponent } from 'react';
import classes from './UserInfoSelectModal.module.css';
import { ModalProps } from '@_hooks/animation/useAnimateModal';
import ModalDisplay from '@ui/Reusable/Modal/ModalDisplay';
import UserInfoList from '@ui/Reusable/UserInfo/UserInfoList';
import { UserInfo } from '@_types/database/userInfo';

interface UserInfoSelectModalProps {
	modalProps: ModalProps;
	selectedInfo?: UserInfo;
	infoSelected: (info: UserInfo) => void;
}

const UserInfoSelectModal: FunctionComponent<UserInfoSelectModalProps> = ({
	modalProps,
	selectedInfo,
	infoSelected
}) => {
	return (
		<ModalDisplay {...modalProps}>
			<div className={classes.container}>
				<h1 className={classes.title}>Select Information</h1>
				<UserInfoList
					selectHandler={infoSelected}
					showPhoneNumber
					selectedInfo={selectedInfo}
				/>
			</div>
		</ModalDisplay>
	);
};

export default UserInfoSelectModal;
