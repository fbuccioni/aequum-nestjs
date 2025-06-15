aequum NestJS uniform data components
=====================================

Components for NestJS to provide uniform data structures, the
data will be wrapped in a DTO or type with a `data` property.

Components
----------

### DTOs

- [`UniformDataDto(DataDto)`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/uniform-data/dtos/uniform-data.dto.ts):
  Factory DTO class to create a uniform data structure, the data will be
  wrapped in a DTO or type with a `data` property.


### Transformers

- [`uniformDataOutputTransform(data)`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/uniform-data/transforms/uniform-data-output.transform.ts):
  Transforms the data to a uniform data structure, the data will be
  wrapped in a DTO or type with a `data` property, it can be used in the
  CRUDL controllers `transform` configuration.


### Types

- [`UniformData<T>`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/uniform-data/types/uniform-data.type.ts):
  Type to define a uniform data structure, the data will be wrapped in a
  `data` property.
