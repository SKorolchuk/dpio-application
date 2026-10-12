const isProduction = !!import.meta.env.NG_BUILD_PRODUCTION;

export const environment = {
    production: isProduction,
    version: isProduction ? "staging" : "development",
    appEndpoint: isProduction ? "" : "http://localhost:4200",
    authEndpoint: isProduction ? "token-service" : "http://localhost:4200",
    defaultLanguage: "en-US",
    supportedLanguages: ["en-US", "de-DE"],
};
