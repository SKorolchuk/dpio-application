export const Api = {
  Login: authEndpoint => `${authEndpoint}/api/accounts/login`,
  Register: authEndpoint => `${authEndpoint}/api/accounts`
};
