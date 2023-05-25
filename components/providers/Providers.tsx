'use client';
import { FunctionComponent, ReactNode, useState } from 'react';
import { CartProvider } from '@_providers/cart/optimistic';
import { NotificationProvider } from '@_providers/Notification/Notification';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { AuthContextProvider } from './UserInfo/UserInfo';

interface ProvidersProps {
	children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: { queries: { refetchOnWindowFocus: false } },
		})
	);

	return (
		<NotificationProvider>
			<SessionProvider>
				<QueryClientProvider client={client}>
					<AuthContextProvider>
						<CartProvider>{children}</CartProvider>
					</AuthContextProvider>
				</QueryClientProvider>
			</SessionProvider>
		</NotificationProvider>
	);
};

export default Providers;
