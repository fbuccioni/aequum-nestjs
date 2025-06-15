GeoJSON DTO models for NestJS provided by aequum
================================================


Just a simple package to provide GeoJSON models for NestJS, extending
the ones from
[`@aequum/geojson-dto`](https://npmjs.org/package/@aequum/geojson-dto)
package which are
[`class-validator`](https://npmjs.org/package/class-validator) based 
along with the
[`@nestjs/swagger`](https://npmjs.org/package/@nestjs/swagger) 
decorators for OpenAPI documentation, validation and use as DTOs.


Components
----------

### DTOs:

- **Features**
  - [`FeatureDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/feature.dto.ts)
  - [`FeatureCollectionDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/feature-collection.dto.ts)

- **Geometries**
  - [`GeometryCollectionDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/geometries/geometry-collection.dto.ts)
  - [ `LineString`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/geometries/line-string.dto.ts)
  - [`MultiLineStringDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/geometries/multi-line-string.dto.ts)
  - [`MultiPointDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/geometries/multi-point.dto.ts)
  - [`MultiPolygonDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/geometries/multi-polygon.dto.ts)
  - [`PointDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/geometries/point.dto.ts)
  - [`PolygonDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/geojson-dto/geometries/polygon.dto.ts)
