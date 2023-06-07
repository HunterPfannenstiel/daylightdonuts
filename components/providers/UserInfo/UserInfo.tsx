import { createContext, useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import {
	getInitialInfo,
	fetchUserInfos,
	addUserInfo,
	deleteUserInfo,
	editUserInfo,
} from './util';
import { useQuery } from '@tanstack/react-query';
import {
	AddUserInfo,
	FetchedUserInfo,
	UserInfo,
} from '@_types/database/userInfo';

const Context = createContext(getInitialInfo());

export default Context;

export const AuthContextProvider: FunctionComponent<
	React.PropsWithChildren
> = ({ children }) => {
	const [infoArray, setInfoArray] = useState<UserInfo[] | null | undefined>(
		null
	);
	const [favoriteId, setFavoriteId] = useState<number | null>(null);

	useEffect(() => {
		const fetchInfo = async () => {
			const infos = (await fetchUserInfos()) as FetchedUserInfo;
			setInfoArray(infos.infos);
			setFavoriteId(infos.favorite_id);
		};
		fetchInfo();
	}, []);

	const addInfoHandler = async (info: AddUserInfo) => {
		const addedId = await addUserInfo(info);
		if (addedId !== -1) {
			setInfoArray((prev) => {
				if (prev) return [...prev, { ...info, id: addedId }];
				else return [{ ...info, id: addedId }];
			});
		}
		return addedId !== -1;
	};

	const editInfoHandler = async (info: UserInfo, infoIdx: number) => {
		const isEdited = await editUserInfo(info);
		if (isEdited) {
			setInfoArray((prev) => {
				const copy = [...prev!];
				copy[infoIdx] = info;
				return copy;
			});
		}
		return isEdited;
	};

	const deleteInfoHandler = async (infoIdx: number) => {
		if (!infoArray) return false;
		const isDeleted = await deleteUserInfo(infoArray[infoIdx].id);
		if (isDeleted) {
			setInfoArray((prev) => {
				const copy = [...prev!];
				copy.splice(infoIdx, 1);
				return copy;
			});
		}
		return isDeleted;
	};

	/* const { data } = useQuery<FetchedUserInfo>({
		queryKey: ['userInfos'],
		queryFn: fetchUserInfos,
	}); */

	return (
		<Context.Provider
			value={{
				infos: infoArray ? infoArray : null,
				favorite_id: favoriteId,
				isSignedIn: infoArray ? true : false,
				addInfo: addInfoHandler,
				editInfo: editInfoHandler,
				deleteInfo: deleteInfoHandler,
			}}
		>
			{children}
		</Context.Provider>
	);
};
