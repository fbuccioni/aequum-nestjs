aequum-nestjs
=============

Aequum is a framework for building apps common components in a fast and easy way, also providing a set of common components, utils, models etc. over the NestJS framework.


Design
------

This framework was designed having in mind hexagonal archivecture and clean code using the DDD (Domain Driven Design) approach, also the components was divided in packages to use them in a modular way.


Packages
--------


- **[@aequum/nestjs-authn](packages/authn/)**: Authentication module
- **[@aequum/nestjs-authz](packages/authz/)**: Authorization module
- **[@aequum/nestjs-common](packages/common/)**: Common components
- **[@aequum/nestjs-crudl](packages/crudl/)**: CRUD/CRUDL operations components
- **[@aequum/nestjs-exceptions](packages/exceptions/)**: Descriptive and rich exceptions module
- **[@aequum/nestjs-geojson-dto](packages/geojson-dto/)**: Validable and swagger ready GeoJSON DTOs
- **[@aequum/nestjs-mongoose](packages/mongoose/)**: Mongoose tools for repository, pagination, CRUD/CRUDL, configs and utils
- **[@aequum/nestjs-paginate-common](packages/paginate-common/)**: Pagination common components