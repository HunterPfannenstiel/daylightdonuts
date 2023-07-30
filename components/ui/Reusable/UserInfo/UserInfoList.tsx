import { FunctionComponent, useContext } from 'react';
import classes from './UserInfoList.module.css';
import UserInfoContext from '../../../providers/UserInfo/UserInfo';
import UserInfo from './UserInfo';

interface UserInfoListProps {
	onSelectHandler: (info: UserInfo) => void;
	showPhoneNumber?: boolean;
	editable?: boolean;
	selectedInfo?: UserInfo;
	updateIdxMap?: (infoId: number, idx: number) => void;
}

const UserInfoList: FunctionComponent<UserInfoListProps> = ({
	onSelectHandler,
	showPhoneNumber,
	editable = false,
	selectedInfo,
	updateIdxMap
}) => {
	const ctx = useContext(UserInfoContext);

	return (
		<>
			<ul className={classes.info_list}>
				{ctx.infos?.map((info, i) => {
					if (updateIdxMap) updateIdxMap(info.id, i);
					return (
						<UserInfo
							info={info}
							key={info.id}
							onSelectHandler={onSelectHandler}
							editable={editable}
							selectedInfo={selectedInfo}
							showPhoneNumber={showPhoneNumber}
						/>
					);
				})}
			</ul>
		</>
	);
};

export default UserInfoList;
