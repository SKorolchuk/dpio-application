export const Api = {
    Login: (authEndpoint) => `${authEndpoint}/api/identity/token`,
    Ping: (authEndpoint) => `${authEndpoint}/api/identity`,
    Register: (authEndpoint) => `${authEndpoint}/api/identity/register`,
    ResetPassword: (authEndpoint) => `${authEndpoint}/api/identity/reset`,
};
