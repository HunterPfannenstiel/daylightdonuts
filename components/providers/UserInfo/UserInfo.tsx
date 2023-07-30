import { createContext, useContext, useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import {
	getInitialInfo,
	fetchUserInfos,
	addUserInfo,
	deleteUserInfo,
	editUserInfo,
} from './util';
import {
	AddUserInfo,
	FetchedUserInfo,
	UserInfo,
} from '@_types/database/userInfo';

const Context = createContext(getInitialInfo());

export default Context;

const idxMap: { [key: number]: number } = {};

export const AuthContextProvider: FunctionComponent<
	React.PropsWithChildren
> = ({ children }) => {
	const [infoArray, setInfoArray] = useState<UserInfo[] | null>([]);
	const [favoriteId, setFavoriteId] = useState<number | null>(null);
	const [email, setEmail] = useState<string>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchInfo = async () => {
			const infos = (await fetchUserInfos()) as FetchedUserInfo;
			if (infos) {
				setInfoArray(infos.infos);
				setFavoriteId(infos.favorite_id);
				setEmail(infos.email);
			}
			setIsLoading(false);
		};
		fetchInfo();
	}, []);

	const addInfoHandler = async (info: AddUserInfo) => {
		const addedId = await addUserInfo(info);
		if (addedId !== -1) {
			setInfoArray((prev) => {
				if (prev) {
					const res = [...prev];
					res.push({ ...info, id: addedId });
					return res;
				} else return [{ ...info, id: addedId }];
			});
		}
		return addedId !== -1;
	};

	const editInfoHandler = async (info: UserInfo) => {
		const isEdited = await editUserInfo(info);
		if (isEdited) {
			setInfoArray((prev) => {
				if (prev) {
					prev[idxMap[info.id]] = info;
					return prev;
				} else return [info];
			});
		}
		return isEdited;
	};

	const deleteInfoHandler = async (infoId: number) => {
		if (!infoArray) return false;
		const isDeleted = await deleteUserInfo(infoId);
		if (isDeleted) {
			const newArr = infoArray.filter((info) => info.id !== infoId);
			setInfoArray(newArr);
		}
		return isDeleted;
	};

	return (
		<Context.Provider
			value={{
				infos: infoArray,
				favorite_id: favoriteId,
				isSignedIn: infoArray ? true : false,
				addInfo: addInfoHandler,
				editInfo: editInfoHandler,
				deleteInfo: deleteInfoHandler,
				email,
				isLoading,
				idxMap,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useAuth = () => useContext(Context);
