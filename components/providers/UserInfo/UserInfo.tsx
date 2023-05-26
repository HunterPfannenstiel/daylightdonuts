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

const Context = createContext(getInitialInfo());

export default Context;

export const AuthContextProvider: FunctionComponent<
	React.PropsWithChildren
> = ({ children }) => {
	const infos = useRef<Info[]>([]);
	const favoriteId = useRef<number>(0);

	const updateFavoriteId = (id: number) => {
		favoriteId.current = id;
		console.log(favoriteId.current);
	};

	const fetchUserInfos = async () => {
		const res = await fetch('/api/account/fetch-info');
		if (!res.ok) {
			throw new Error("Couldn't fetch user infos");
		}
		const userInfo = (await res.json()) as FetchedInfo;
		infos.current = userInfo.info.infos;
		favoriteId.current = userInfo.info.favorite_id;
		console.log(userInfo.info.favorite_id);
		return res;
	};

	useQuery({ queryKey: ['userInfos'], queryFn: fetchUserInfos });

	return (
		<Context.Provider
			value={{
				infos: infos.current,
				favorite_id: favoriteId.current,
			}}
		>
			{children}
		</Context.Provider>
	);
};
