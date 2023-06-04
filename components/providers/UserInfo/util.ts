import { UserSession } from '@_types/auth';
import {
	AddUserInfo,
	FetchedUserInfo,
	UserInfo,
} from '@_types/database/userInfo';

export type UserInfoContext = {
	addInfo: (info: AddUserInfo) => Promise<boolean>;
	editInfo: (info: UserInfo) => Promise<boolean>;
	deleteInfo: (id: number) => Promise<boolean>;
} & FetchedUserInfo;

export const getInitialInfo = (): UserInfoContext => {
	return {
		infos: [],
		favorite_id: null,
		isSignedIn: false,
		async addInfo(info: AddUserInfo) {
			return false;
		},
		async editInfo(info: UserInfo) {
			return false;
		},
		async deleteInfo(id: number) {
			return false;
		},
	};
};
