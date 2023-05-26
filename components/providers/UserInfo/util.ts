import { UserSession } from '@_types/auth';

export const getInitialInfo = (): UserInfoContext => {
	return {
		infos: [],
		favorite_id: 0,
	};
};
