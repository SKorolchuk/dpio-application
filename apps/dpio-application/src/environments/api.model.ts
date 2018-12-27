export const Api = {
  Login: authEndpoint => `${authEndpoint}/api/accounts/login`,
  Ping: authEndpoint => `${authEndpoint}/api/accounts`,
  Register: authEndpoint => `${authEndpoint}/api/accounts`
};
