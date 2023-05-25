import { Session } from "next-auth"

export type UserSession = {
    session: Session | null;
    signUserIn: (provider: string) => Promise<boolean>;
    signUserOut: () => void;
    retrieveUserSession: () => void;
}

export type UserToken = {
    userId: number;
} & Session;