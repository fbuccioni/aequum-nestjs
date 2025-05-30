/** JWT related configuration  */
export interface AuthnJwtConfiguration {
    /** JWT secret, default is `'secret'` */
    secret?: string;

    /** JWT expiration time in seconds, default 1 hour */
    expiresAfter?: number;
}

/** Password related configuration */
export interface AuthnPasswordConfiguration {
    /** Password salt rounds, default is 10 */
    saltRounds?: number;
}

/**
 * Used to map custom user fields on User DTO
 * for the authentication process.
 */
export interface AuthnUserFieldConfiguration {
    /** Username field, default is `'username'` */
    username?: string;
    /** Password field, default is `'password'` */
    password?: string;
    /** User ID field, default is `'id'` */
    id?: string;
    /** Refresh token field, default is `'refreshToken'` */
    refreshToken?: string;
}

/** User authentication configuration  */
export interface AuthnUserConfiguration {
    /**
    * Map for custom user fields on User DTO
    * for the authentication process.
    */
    fields?: AuthnUserFieldConfiguration;
}


/** Authentication configuration */
export interface AuthnConfiguration {
    /** Swagger auth module, can use jwt as bearer */
    swagger?: string | null;

    /** Password configuration */
    password?: AuthnPasswordConfiguration;

    /** JWT configuration */
    jwt?: AuthnJwtConfiguration;

    /** Disable refresh token */
    disableRefreshToken?: boolean;

    /** User configuration */
    user?: AuthnUserConfiguration;
}

/** Authentication configuration from global configuration */
export interface AuthnGlobalConfiguration {
    /** Authentication configuration */
    authentication?: AuthnConfiguration;
}
