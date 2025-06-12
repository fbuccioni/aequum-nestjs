/**
 * Used for standarized output in a uniform way, it simply
 * wraps the type `T` into a `data` property of a new object.
 *
 * @typeParam T - Type to be wrapped.
 */
export interface UniformData<T> {
    data: T;
}