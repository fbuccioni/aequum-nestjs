/**
 * A list of what to do when no user is found.
 *
 * - `allow-access`: allow access without user
 * - `deny-access`: deny access without user
 * - `return-default-policy`: return the default policy
 * - `throw-exception`: throw an error when no user is found
 */
export const WhenNoUserActions = [
    'allow-access',
    'deny-access',
    'return-default-policy',
    'throw-exception'
] as const;

/**
 * What to do when no user is found
 *
 * - `allow-access`: allow access without user
 * - `deny-access`: deny access without user
 * - `return-default-policy`: return the default policy
 * - `throw-exception`: throw an error when no user is found
 */
export type WhenNoUserAction = typeof WhenNoUserActions[number];
