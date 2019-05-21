export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
}

export interface UserPasswordReset {
  email: string;
  password: string;
  confirmPassword: string;
}
