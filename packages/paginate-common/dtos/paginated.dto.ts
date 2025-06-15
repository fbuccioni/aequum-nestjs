import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ClassConstructor } from '@aequum/types';

import { PaginatorDto as PaginatorDtoClass } from "./paginator.dto";


/**
 * Factory class to create a DTO for pagination with a custom filter
 * if needed.
 *
 * @typeParam Dto - Type from `dto` argument
 * @typeParam PaginatorDto - Type from `paginatorDto` argument
 * @typeParam DtoType - Instance type from `dto` argument if it is an
 * array extract the type from the first element.
 *
 * @param dto - DTO class to paginate
 * @param paginatorDto - Paginator DTO class, defaults to
 * `PaginatorDtoClass`
 *
 * @constructor
 */
export function PaginatedDto<
    Dto extends ClassConstructor | [ ClassConstructor ],
    PaginatorDto extends ClassConstructor = typeof PaginatorDtoClass,
    DtoType = (
        // tuple
        Dto extends [ infer U extends ClassConstructor ]
        ? InstanceType<U>
        : (
            // single class
            Dto extends ClassConstructor
            ? InstanceType<Dto>
            : (
                // array of class
                Dto extends Array<infer U extends ClassConstructor>
                ? InstanceType<U>[]
                : never
            )
        )
    )
>(
    dto: Dto,
    paginatorDto: PaginatorDto | typeof PaginatorDtoClass = PaginatorDtoClass
) {
    const realType = Array.isArray(dto) ? dto[0] : dto as Function;

    class PaginatedDto$<D, P> {
        @ApiProperty({
            description: 'Result data',
            type: 'array',
            items: { $ref: getSchemaPath(realType) },
        })
        data: D[];

        @ApiProperty({
            description: 'Paginator info',
            type: paginatorDto
        })
        paginator: P
    }

    Object.defineProperty(PaginatedDto$, 'name', Object.assign(
        Object.getOwnPropertyDescriptor(PaginatedDto$, 'name') as any,
        { value: `Paginated${(<Function> dto).name}` }
    ));

    return PaginatedDto$<DtoType, InstanceType<PaginatorDto>>
}
