import { FunctionComponent, useRef } from 'react';
import { getSession, signIn } from 'next-auth/react';
import classes from './AccountPage.module.css';
import { Session } from 'next-auth';

interface AccountPageProps {}

type Creds = {
	id: string;
	password: string;
} & Session;

const AccountPage: FunctionComponent<AccountPageProps> = () => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const res = await signIn('credentials', {
				redirect: false,
				username: usernameRef.current!.value,
				password: passwordRef.current!.value,
			});
            const session = await getSession();
            console.log(session);
			console.log('logged in!');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div>
				<form onSubmit={onSubmitHandler}>
					<input type="text" id="username" ref={usernameRef} />
					<input type="text" id="password" ref={passwordRef} />
                    <button>CLICK</button>
				</form>
			</div>
		</>
	);
};

export default AccountPage;
