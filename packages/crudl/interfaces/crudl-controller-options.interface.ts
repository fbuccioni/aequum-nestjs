import { ClassConstructor } from '@aequum/types';
import { PipeTransform } from '@nestjs/common';

import {
    CRUDLMappedOperations,
    CRUDLMappedOperationsWithAll,
    CRUDLTransformInputFunction,
    CRUDLTransformOutputFunction
} from '../types/crudl.types';


/**
 * CRUDLController options
 */
export interface CRUDLControllerOptions {
    /** Information about the name of the  entity */
    name: {
        /** Singular name of the entity */
        singular: string;
        /** Plural name of the entity */
        plural: string;
    };

    /** Options related to the ID of the entity */
    id: {
        /** Type of the ID this can be a class/constructor */
        type: 'string' | 'number' | ClassConstructor;
        /** Pipe to be used to validate the ID */
        validationPipe: ClassConstructor<PipeTransform>;
        /** Route param name */
        routeParam?: string;
    };

    /** Forbid actions */
    forbid?: Partial<CRUDLMappedOperations<boolean>>;

    /** auth */
    auth?: string | string[];

    /** Apply decorators on methods, '*' will apply to all methods */
    applyDecorators?: Partial<CRUDLMappedOperationsWithAll<MethodDecorator[]>>;

    /**
     * Transformation of the entity cases
     */
    transform?: {
        filter?: { input?: CRUDLTransformInputFunction; };
        body?: {
            input?: CRUDLTransformInputFunction;
            output?: CRUDLTransformOutputFunction;
        };
        id?: { input?: CRUDLTransformInputFunction; };
    };
};
