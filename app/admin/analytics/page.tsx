'use client'
import { FunctionComponent } from 'react';
import classes from './AdminAnalytics.module.css';
import { useQuery } from '@tanstack/react-query';
import Analytics from 'components/ui/Analytics/Analytics';

interface AdminAnalyticsProps {}

const AdminAnalytics: FunctionComponent<AdminAnalyticsProps> = () => {
	return (
		<div>
			<Analytics />
		</div>
	);
};

export default AdminAnalytics;
