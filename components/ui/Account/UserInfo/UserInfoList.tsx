import { FunctionComponent, useContext } from 'react';
import classes from './UserInfoList.module.css';
import UserInfoContext from '../../../providers/UserInfo/UserInfo';
import UserInfo from './UserInfo';

interface UserInfoListProps {}

const UserInfoList: FunctionComponent<UserInfoListProps> = () => {
	const ctx = useContext(UserInfoContext);

	return (
		<div className={classes.container}>
			<h1>Stored Information</h1>
			<ul>
				{ctx.infos?.map((info) => (
					<UserInfo info={info} favoriteId={ctx.favorite_id} key={info.id}/>
				))}
			</ul>
		</div>
	);
};

export default UserInfoList;
