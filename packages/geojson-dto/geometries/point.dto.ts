import { ApiProperty } from '@nestjs/swagger';
import { Point, Coordinate } from '@aequum/geojson-models';


export class PointDto extends Point {
    @ApiProperty({
        example: 'Point',
        description: 'The type of the GeoJSON object',
        enum: [ 'Point' ]
    })
    type = 'Point' as const;

    @ApiProperty({
        description: 'The declare coordinates of the GeoJSON object',
        type: 'array',
        items: {
            type: 'number'
        },
        minItems: 2
    })
    declare coordinates: Coordinate;
}
