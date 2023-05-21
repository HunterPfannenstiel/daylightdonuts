import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
    secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			authorize(credentials) {
				if (!credentials) throw new Error('Oops');
				const { username, password } = credentials;
				if (username !== 'Payton' || password !== '123')
					throw new Error('Invalid creds!');
				return { _id: username, email: password };
			},
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'text',
				},
			},
		}),
	],
});
