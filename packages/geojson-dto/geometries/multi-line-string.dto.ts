import { ApiProperty } from '@nestjs/swagger';
import { MultiLineString, Coordinate } from '@aequum/geojson-models';


export class MultiLineStringDto extends MultiLineString {
    @ApiProperty({
        example: 'MultiLineString',
        description: 'The type of the GeoJSON object',
        enum: [ 'MultiLineString' ]
    })
    type = 'MultiLineString' as const;

    @ApiProperty({
        description: 'The declare coordinates of the GeoJSON object',
        type: 'array',
        items: {
            type: 'array',
            items: {
                type: 'array',
                items: {
                    type: 'number'
                },
                minItems: 2
            }
        },
    })
    declare coordinates: Coordinate[][];
}
