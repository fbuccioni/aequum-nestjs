import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ClassConstructor } from "@aequum/types";


export function UniformDataDto<T extends ClassConstructor | [ ClassConstructor ]>(DataDto: T) {
    const DataDtoArg = Array.isArray(DataDto) ? DataDto[0] : DataDto as Function;

    @ApiExtraModels(DataDtoArg)
    class UniformDataDto<U> {
        @ApiProperty({
            description: 'Data response',
            $ref: getSchemaPath(DataDtoArg),
        } as any)
        data: U;
    }

    return UniformDataDto<T>;
}