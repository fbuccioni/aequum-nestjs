import { UniformData } from "../types/uniform-data.type";

/**
 * CRUDL transform for standarizing the output in a uniform way,
 * it simply wraps the data in a `data` property of a new object.
 *
 * @param data - Data to be wrapped.
 */
export default async function uniformDataOutputTransform<T>(
    data: T, ..._: any[]
): Promise<UniformData<T>> {
    return { data };
};