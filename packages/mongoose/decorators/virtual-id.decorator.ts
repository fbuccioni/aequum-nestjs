import { Document } from 'mongoose';
import { Virtual, VirtualOptions } from '@nestjs/mongoose';


/**
 * Decorator for a virtual ID column in a NestJS
 * Mongoose schema.
 *
 * @param options Options for the virtual field.
 */
export const VirtualID = (options?: VirtualOptions) =>
    Virtual({
        options: options || undefined,
        get(this: Document) {
            return this._id;
        },
        set(this: Document, id: string) {
            this._id = id;
        },
    });