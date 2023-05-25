import {
	ChildContextProvider,
	createContext,
	useEffect,
	useState,
} from 'react';
import { getInitialAuth } from './util';

const Context = createContext(getInitialAuth());

export default Context;

import { FunctionComponent } from 'react';
import { getSession, signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export const AuthContextProvider: FunctionComponent<
	React.PropsWithChildren
> = ({ children }) => {
	const [session, setSession] = useState<Session | null>(null);

	const signUserIn = async (provider: string) => {
		await signIn(provider);

		const res = await getSession();
		setSession(res);

		if (res) return true;
		else return false;
	};

	const signUserOut = async () => {
		await signOut();
		setSession(null);
	};

	const retrieveUserSession = async () => {
		setSession(await getSession());
	};

	useEffect(() => {
		retrieveUserSession();
	}, []);

	return (
		<Context.Provider
			value={{ session, signUserIn, signUserOut, retrieveUserSession }}
		>
			{children}
		</Context.Provider>
	);
};
