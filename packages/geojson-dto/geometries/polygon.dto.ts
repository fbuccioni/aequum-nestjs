import { ApiProperty } from '@nestjs/swagger';
import { Polygon, Coordinate } from '@aequum/geojson-models';


export class PolygonDto extends Polygon {
    @ApiProperty({
        example: 'Polygon',
        description: 'The type of the GeoJSON object',
        enum: [ 'Polygon' ]
    })
    type= 'Polygon' as const;

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
