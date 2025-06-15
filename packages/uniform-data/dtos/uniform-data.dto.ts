import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ClassConstructor } from "@aequum/types";


/**
 * Factory class to create a DTO class for uniform data response,
 * it means that the `DataDto` argument will be in `data` property.
 *
 * @typeParam DataDtoType - Take the type from the `DataDto`
 * argument.
 * @typeParam RealDataDtoType - Instance type from the `DataDto`
 * argument if it is an array extract the type from the first
 * element.
 *
 * @param DataDto Must be the DTO class or an array with the DTO
 * class inside
 */
export function UniformDataDto<
    DataDtoType extends ClassConstructor | [ ClassConstructor ],
    RealDataDtoType = (
        DataDtoType extends [ infer U extends ClassConstructor ]
        ? InstanceType<U>[]
        : (
            DataDtoType extends ClassConstructor
            ? InstanceType<DataDtoType>
            : never
        )
    )
>(DataDto: DataDtoType) {
    const RealDataDto = (
        Array.isArray(DataDto) ? DataDto[0] : DataDto
    ) as Function;

    @ApiExtraModels(RealDataDto)
    class UniformDataDto$<U> {
        @ApiProperty({
            description: 'Data response',
            type: DataDto,
            $ref: getSchemaPath(RealDataDto),
        } as any)
        data: U;
    }

    Object.defineProperty(UniformDataDto$, 'name', Object.assign(
        Object.getOwnPropertyDescriptor(UniformDataDto$, 'name') as any,
        { value: `${(<Function> DataDto).name.replace(/dto$/gi, '')}UniformDataDto` }
    ));

    return UniformDataDto$<RealDataDtoType>;
}
