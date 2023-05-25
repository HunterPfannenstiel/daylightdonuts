type UserInfo = {
    infos: Info[];
    favorite_id: number | null;
}

type Info = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    id: number;
}