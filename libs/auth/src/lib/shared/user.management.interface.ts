export interface UserRegistration {
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly location: string;
}

export interface UserPasswordReset {
    readonly email: string;
    readonly password: string;
    readonly confirmPassword: string;
}
