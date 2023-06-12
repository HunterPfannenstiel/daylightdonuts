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
import { UserInfo } from '@_types/database/userInfo';

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
		return res.json();
	};

	const { data } = useQuery<UserInfo>({
		queryKey: ['userInfos'],
		queryFn: fetchUserInfos,
	});

	return (
		<Context.Provider
			value={{
				infos: data?.infos,
				favorite_id: data?.favorite_id,
			}}
		>
			{children}
		</Context.Provider>
	);
};
