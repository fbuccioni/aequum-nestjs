import { Policy } from "../types/policies.type";
import { WhenNoUserAction } from "../types/when-no-user-actions.type";


export interface AuthzConfiguration {
    /** Property to get the role from User model */
    rolesUserProperty: string,

    /**
     * Default policy for RBAC guard, when no action was
     * defined from decorators, by default is `allow` it
     * means allow all if `deny` it deny all access until
     * use decorators to allow access.
     */
    defaultPolicy: Policy,

    /**
     * What to do when no user is found. by default is
     * `return-default-policy`:
     *
     * - `allow-access`: allow access without user
     * - `deny-access`: deny access without user
     * - `return-default-policy`: return the default policy
     * - `throw-exception`: throw an error when no user is found
     */
    whenNoUser: WhenNoUserAction,
}