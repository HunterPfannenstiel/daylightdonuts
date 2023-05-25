import { createAccount, getUserId } from '@_utils/database/account/queries';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET!,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.userId = await getUserId(token.email!);
				if (!token.userId) {
					token.userId = await createAccount(token.email!);
				}
			}
			console.log(token);
			return token;
		},
	},
});
