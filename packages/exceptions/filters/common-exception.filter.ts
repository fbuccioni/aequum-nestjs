import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationableException } from '@aequum/exceptions/interfaces';
import { BaseException } from '@aequum/exceptions';
import { HttpResponseDescriptions } from '@aequum/nestjs-common/enums';


/**
 * Common exception filter for handling exceptions based
 * on the `BaseException` class
 */
@Catch(BaseException)
export class CommonExceptionFilter implements ExceptionFilter {
    catch(exception: BaseException & ValidationableException, host: ArgumentsHost) {
        if (typeof exception.asValidationException !== 'undefined')
            exception = exception.asValidationException();

        const ctx = host.switchToHttp();
        const response: any = ctx.getResponse();
        const statusCode = (exception.constructor as typeof BaseException).HTTPStatusCode || 500;
        const errorResponseBody = {
            statusCode,
            description: HttpResponseDescriptions[
                HttpStatus[statusCode].toString() as keyof typeof HttpResponseDescriptions
            ],
            ...exception // Exceptions can be converted in plain objects
        } as unknown as HttpException

        response.status(statusCode)
        response.send(errorResponseBody);
    }
}
