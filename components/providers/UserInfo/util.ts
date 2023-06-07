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

export const fetchUserInfos = async () => {
	const res = await fetch('/api/account/fetch-info');
	if (!res.ok) {
		throw new Error("Couldn't fetch user infos");
	}
	const info = await res.json();
	return info.info;
};

export const addUserInfo = async (info: AddUserInfo) => {
	const res = await fetch('/api/account/edit-info', {
		method: 'POST',
		body: JSON.stringify({ info }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (!res.ok) {
		const error = await res.json();
		console.log(error.message);
	}
	return await res.json() as number;
};

export const editInfo = async (info: UserInfo) => {
	const res = await fetch('/api/account/edit-info', {
		method: 'PUT',
		body: JSON.stringify({ info }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (!res.ok) {
		const error = await res.json();
		console.log(error.message);
	}
	return res.ok;
};

export const deleteUserInfo = async (id: number) => {
	const res = await fetch('/api/account/edit-info?id=' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (!res.ok) {
		const error = await res.json();
		console.log(error.message);
	}
	return res.ok;
};