import { ApiProperty } from '@nestjs/swagger';
import { LineString, Coordinate } from '@aequum/geojson-models';


export class LineStringDto extends LineString {
    @ApiProperty({
        example: 'LineString',
        description: 'The type of the GeoJSON object',
        enum: [ 'LineString' ]
    })
    type = 'LineString' as const;

    @ApiProperty({
        description: 'The declare coordinates of the GeoJSON object',
        type: 'array',
        items: {
            type: 'array',
            items: {
                type: 'number'
            },
            minItems: 2
        }
    })
    declare coordinates: Coordinate[];
}
