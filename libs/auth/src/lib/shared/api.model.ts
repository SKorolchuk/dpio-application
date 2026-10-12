const IDENTITY_BASE = "api/identity";

export const Api = {
    Login: (authEndpoint: string): string => `${authEndpoint}/${IDENTITY_BASE}/token`,
    Ping: (authEndpoint: string): string => `${authEndpoint}/${IDENTITY_BASE}`,
    Register: (authEndpoint: string): string => `${authEndpoint}/${IDENTITY_BASE}/register`,
    ResetPassword: (authEndpoint: string): string => `${authEndpoint}/${IDENTITY_BASE}/reset`,
} as const;
