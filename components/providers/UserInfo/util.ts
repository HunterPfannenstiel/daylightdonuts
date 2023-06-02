import { UserSession } from '@_types/auth';
import { AddUserInfo, UpdatingInfo, UserInfo } from '@_types/database/userInfo';

export type UserInfoContext = {
	addInfo: (info: AddUserInfo) => Promise<boolean>;
	editInfo: (info: UpdatingInfo) => Promise<boolean>;
	deleteInfo: (id: number) => Promise<boolean>;
} & UserInfo;

export const getInitialInfo = (): UserInfoContext => {
	return {
		infos: [],
		favorite_id: 0,
		async addInfo(info: AddUserInfo) {
			return false;
		},
		async editInfo(info: UpdatingInfo) {
			return false;
		},
		async deleteInfo(id: number) {
			return false;
		},
	};
};
