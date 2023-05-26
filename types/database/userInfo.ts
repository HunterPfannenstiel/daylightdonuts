type UserInfo = {
    infos: Info[];
    favorite_id: number;
}

type Info = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    id: number;
}

type FetchedInfo = {
    info: UserInfo;
    isSignedIn: boolean;
}

type UserInfoContext = {
} & UserInfo;