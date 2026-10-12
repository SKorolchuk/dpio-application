export interface Credentials {
    readonly username: string;
    readonly token: string;
    readonly password?: string;
}

export interface ILogin {
    readonly email: string;
    readonly password: string;
    readonly remember: boolean;
}
