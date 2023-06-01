import { UserSession } from '@_types/auth';
import { UpdatingInfo, UserInfoContext } from '@_types/database/userInfo';

export const getInitialInfo = (): UserInfoContext => {
	return {
		infos: [],
		favorite_id: 0,
		async editInfo(info: UpdatingInfo) {
			return false;
		},
		async deleteInfo(id: number) {
			return false;
		},
	};
};
