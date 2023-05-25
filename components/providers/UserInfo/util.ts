import { UserSession } from '@_types/auth';

export const getInitialInfo = (): UserInfo => {
	return {
		infos: [],
		favorite_id: 0
	};
};
