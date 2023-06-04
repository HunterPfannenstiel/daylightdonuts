import { FunctionComponent, useContext, useState } from 'react';
import classes from './UserInfoList.module.css';
import UserInfoContext from '../../../providers/UserInfo/UserInfo';
import UserInfo from './UserInfo';
import UserInfoModal from './UserInfoModal';
import { AddUserInfo } from '@_types/database/userInfo';

interface UserInfoListProps {}

const UserInfoList: FunctionComponent<UserInfoListProps> = () => {
	const [showModal, setShowModal] = useState<number | null>(null);
	const ctx = useContext(UserInfoContext);

	const onClickHandler = async (infoId: number) => {
		setShowModal((prev) => {
			if (prev) return null;
			else return infoId;
		});
	};

	const onSubmitHandler = async (info: AddUserInfo, infoId: number | null) => {
		if (infoId) {
			return await ctx.editInfo({ ...info, id: infoId });
		} else {
			return await ctx.addInfo(info);
		}
	};

	return (
		<>
			<div className={classes.container}>
				<h1>Stored Information</h1>
				<ul>
					{ctx.infos?.map((info) => (
						<UserInfo
							info={info}
							key={info.id}
							onClickHandler={onClickHandler}
						/>
					))}
				</ul>
			</div>
			{showModal && (
				<UserInfoModal callback={onSubmitHandler} infoId={showModal} />
			)}
		</>
	);
};

export default UserInfoList;
