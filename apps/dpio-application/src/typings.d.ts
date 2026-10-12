interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    /**
     * Automatically injected build flag indicating compilation mode.
     */
    readonly NG_BUILD_PRODUCTION: boolean;

    // Add additional compile-time process flags here if needed
}
