import { createAccount, getAccountId } from '@_utils/database/account/queries';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
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
				token.accountId = await getAccountId(token.email!);
				if (!token.accountId) {
					token.accountId = await createAccount(token.email!);
				}
			}
			return token;
		},
		session({ session, token }: { session: any; token: any }) {
			session.accountId = token.accountId;
			return session;
		},
	},
};

export default NextAuth(authOptions);
