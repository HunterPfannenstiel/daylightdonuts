type UserInfo = {
    infos: Info[] | undefined;
    favorite_id: number | undefined;
}

type Info = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    id: number;
}

type FetchedInfo = {
    info: UserInfo | null;
    isSignedIn: boolean;
}

type UserInfoContext = {
} & UserInfo;