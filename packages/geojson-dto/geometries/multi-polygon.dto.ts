import { ApiProperty } from '@nestjs/swagger';
import { MultiPolygon, Coordinate } from '@aequum/geojson-models';


export class MultiPolygonDto extends MultiPolygon {
    @ApiProperty({
        example: 'MultiPolygon',
        description: 'The type of the GeoJSON object',
        enum: [ 'MultiPolygon' ]
    })
    type = 'MultiPolygon' as const;

    @ApiProperty({
        description: 'The declare coordinates of the GeoJSON object',
        type: 'array',
        items: {
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
        },
    })
    declare coordinates: Coordinate[][][];
}
