import { createContext } from 'react';
import { FunctionComponent } from 'react';
import {
	getInitialInfo,
	fetchUserInfos,
	addInfo,
	deleteInfo,
	editInfo,
} from './util';
import { useQuery } from '@tanstack/react-query';
import { FetchedUserInfo } from '@_types/database/userInfo';

const Context = createContext(getInitialInfo());

export default Context;

export const AuthContextProvider: FunctionComponent<
	React.PropsWithChildren
> = ({ children }) => {
	const { data } = useQuery<FetchedUserInfo>({
		queryKey: ['userInfos'],
		queryFn: fetchUserInfos,
	});

	return (
		<Context.Provider
			value={{
				infos: data ? data.infos : null,
				favorite_id: data ? data?.favorite_id : null,
				isSignedIn: data ? data.isSignedIn : false,
				addInfo,
				editInfo,
				deleteInfo,
			}}
		>
			{children}
		</Context.Provider>
	);
};
