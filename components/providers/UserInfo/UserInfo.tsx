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

const idMap: { [key: number]: number } = {};
let favId = -1;

export const AuthContextProvider: FunctionComponent<
	React.PropsWithChildren
> = ({ children }) => {
	const [infoArray, setInfoArray] = useState<UserInfo[]>([]);
	const [favoriteId, setFavoriteId] = useState<number | null>(null);
	const [email, setEmail] = useState<string>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchInfo = async () => {
			const infos = (await fetchUserInfos()) as FetchedUserInfo;
			if (infos) {
				const array = infos.infos ? infos.infos : [];
				setInfoArray(array);
				setFavoriteId(infos.favorite_id);
				setEmail(infos.email);
				for (let i = 0; i < array.length; i++) {
					const info = array[i];
					idMap[info.id] = i;
					if (info.favorite) favId = info.id;
				}
			}
			setIsLoading(false);
		};
		fetchInfo();
	}, []);

	const addInfoHandler = async (info: AddUserInfo) => {
		const addedId = await addUserInfo(info);
		if (addedId !== -1) {
			idMap[addedId] = infoArray.length;
			setInfoArray((prev) => {
				const res = [...prev];
				res.push({ ...info, id: addedId });
				if (info.favorite) {
					if (favId !== -1) res[idMap[favId]].favorite = false;
					favId = addedId;
				}
				return res;
			});
		}
		return addedId !== -1;
	};

	const editInfoHandler = async (info: UserInfo) => {
		const oldInfo = infoArray[idMap[info.id]];
		let different = false;
		for (const key in oldInfo) {
			if (oldInfo[key as keyof UserInfo] !== info[key as keyof UserInfo]) {
				different = true;
				break;
			}
		}
		if (!different) return true;

		const isEdited = await editUserInfo(info);
		if (isEdited) {
			setInfoArray((prev) => {
				prev[idMap[info.id]] = info;
				if (info.favorite && favId !== -1 && favId !== info.id) {
					prev[idMap[favId]].favorite = false;
					favId = info.id;
				}
				return prev;
			});
		}
		return isEdited;
	};

	const deleteInfoHandler = async (infoId: number) => {
		if (!infoArray.length) return false;

		const isDeleted = await deleteUserInfo(infoId);
		if (isDeleted) {
			if (infoId === favId) favId = -1;
			let idFound = false;
			const newArr = infoArray.filter((info, i) => {
				if (info.id === infoId) idFound = true;
				else {
					if (info.favorite) favId = info.id;
					if (idFound) idMap[info.id] = i - 1;
				}
				return info.id !== infoId;
			});
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
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useAuth = () => useContext(Context);
