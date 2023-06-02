import {
	ChildContextProvider,
	createContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { FunctionComponent } from 'react';
import { getInitialInfo } from './util';
import { useQuery } from '@tanstack/react-query';
import {
	AddUserInfo,
	Info,
	UpdatingInfo,
	UserInfo,
} from '@_types/database/userInfo';

const Context = createContext(getInitialInfo());

export default Context;

export const AuthContextProvider: FunctionComponent<
	React.PropsWithChildren
> = ({ children }) => {
	const fetchUserInfos = async () => {
		const res = await fetch('/api/account/fetch-info');
		if (!res.ok) {
			throw new Error("Couldn't fetch user infos");
		}
		const info = await res.json();
		return info.info;
	};

	const { data } = useQuery<UserInfo>({
		queryKey: ['userInfos'],
		queryFn: fetchUserInfos,
	});

	const addInfo = async (info: AddUserInfo) => {
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
		return res.ok;
	};

	const editInfo = async (info: UpdatingInfo) => {
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

	const deleteInfo = async (id: number) => {
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

	return (
		<Context.Provider
			value={{
				infos: data ? data.infos : null,
				favorite_id: data ? data?.favorite_id : null,
				addInfo,
				editInfo,
				deleteInfo,
			}}
		>
			{children}
		</Context.Provider>
	);
};
