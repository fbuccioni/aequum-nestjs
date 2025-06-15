import {
    ValidationError as NestValidationError,
    ValidationPipe as NestValidationPipe
} from "@nestjs/common";
import {
    ValidationException,
    ValidationExceptionErrorDetails,
    ValidationExceptionErrorObject
} from "@aequum/exceptions/validation";

import { conversionFromClassValidatorMap } from "../maps/conversion-from-class-validator.map";


/**
 * Custom validation pipe that converts `class-validator` errors to
 * an `@aequum/exception`
 *
 * @see ValidationException
 * @see https://docs.nestjs.com/pipes#the-built-in-validationpipe
 */
export class ValidationPipe extends NestValidationPipe {
    isDetailedOutputDisabled = false

    /**
     * @ignore
     */
    static constraintToDetailsReducer(
        validationExceptionErrorsDetails: ValidationExceptionErrorDetails,
        [ constraintName, message ]: [ string, string ]
    ): ValidationExceptionErrorDetails {
        const conversionMapEntry = conversionFromClassValidatorMap[constraintName];

        if (conversionMapEntry) {
            let constraints: string[] | undefined = [];
            if (conversionMapEntry.constraintsRegexp)
                constraints = message.match(conversionMapEntry.constraintsRegexp)?.slice(1);

            validationExceptionErrorsDetails.push([
                conversionMapEntry.code,
                message,
                constraints
            ]);
        } else {
            validationExceptionErrorsDetails.push([
                'ERR_VAL_UNKNOWN',
                `Unknown validation error: ${message}`
            ]);
        }

        return validationExceptionErrorsDetails;
    }

    /**
     * Reducer function that converts a class-validator constraint
     * errors to a `ValidationExceptionErrorDetails` object
     *
     * @param errorsObject - The object to append the error
     * @param nestValidationError - `class-validator` errors object
     */
    static validationErrorReducer(
        errorsObject: ValidationExceptionErrorObject,
        nestValidationError: NestValidationError
    ): ValidationExceptionErrorObject {
        if (!nestValidationError.constraints)
            return errorsObject;

        errorsObject[nestValidationError.property] = (
            Object.entries(nestValidationError.constraints)
                .reduce(
                    this.constraintToDetailsReducer,
                    [] as ValidationExceptionErrorDetails
                )
        );

        return errorsObject;
    }

    /**
     * Creates a factory function that creates a `ValidationException` object
     * from an array of nest `ValidationError` objects
     */
    public createExceptionFactory(): (ea?: NestValidationError[]) => ValidationException {
        const self = this.constructor as typeof ValidationPipe;

        return (nestValidatorErrors: NestValidationError[] = []) => {
            const errors = nestValidatorErrors.reduce(
                self.validationErrorReducer.bind(self),
                {}
            );

            return new ValidationException(errors);
        };
    }
}
