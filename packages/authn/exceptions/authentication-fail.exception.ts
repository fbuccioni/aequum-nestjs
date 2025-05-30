import { BaseException } from "@aequum/exceptions";


export class AuthenticationFailException extends BaseException {
    static code = 'ERR_AUTHN_FAIL';
    static HTTPStatusCode = 401;

    constructor(
        message,
        public input: { [ k: string ]: any },
        cause?: Error
    ) {
        super(message || 'Authentication fail', { cause }, cause?.stack);
    }
}
