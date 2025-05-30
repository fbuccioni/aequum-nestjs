import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PaginateResult } from "@aequum/paginate-common";
import { ClassConstructor } from '@aequum/types';

import { PaginatorDto } from "./paginator.dto";


/**
 * Class to create a DTO for pagination with a custom filter if needed.
 *
 * @param type - DTO class to paginate
 * @example ```typescript
 * class ModelPaginatedListDto extends PaginatedDto(ModelDto) {}
 * ```
 * @constructor
 */
export function PaginatedDto<T extends ClassConstructor>(type: T) {
    class PaginatedDto implements PaginateResult<T>{
        @ApiProperty({
            description: 'Result data',
            type: 'array',
            items:  { $ref: getSchemaPath(type) },
        })
        data: T[];

        @ApiProperty({
            description: 'Paginator info',
            type: PaginatorDto
        })
        paginator: PaginatorDto
    }

    return PaginatedDto;
}
