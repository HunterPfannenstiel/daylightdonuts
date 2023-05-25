import { UserSession } from '@_types/auth';

export const getInitialAuth = (): UserSession => {
	return {
		session: null,
		async signUserIn(provider: string) {
			return true;
		},
		signUserOut() {},
        async retrieveUserSession() {}
	};
};
