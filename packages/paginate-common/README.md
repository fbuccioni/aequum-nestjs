aequum NestJS pagination common components
==========================================

Common components for pagination in NestJS, used by the
[`@aequum/nestjs-crudl`](https://npmjs.org/package/@aequum/nestjs-crudl) package.


Components
----------

### DTOs

- [`PaginateQueryWithFilterDto(ModelFilterDto)`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/paginate-common/dtos/paginate-query-with-filter.dto.ts):
  Factory DTO class for pagination query with filter, used to define 
  the structure of the pagination query with filter parameters.
- [`PaginatedDto(dto, paginatorDto = PaginatorDto)`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/paginate-common/dtos/paginated.dto.ts):
  Factory DTO class for paginated response, used to define the structure
  of the paginated response `ModelDto` in `data` property and 
  pagination metadata `PaginatorDto` in `paginator` property.
- [`PaginatorDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/paginate-common/dtos/paginator.dto.ts):
  DTO for pagination metadata, used to define the structure of the
  pagination metadata in the paginated response.


### Interfaces

- [`PaginateRequest`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/paginate-common/interfaces/paginate-request.interface.ts):
  Interface for the pagination request, used to define the structure of
  the pagination request.


### Utils

- [`fillPaginateRequestFromQuery`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/paginate-common/utils/query.util.ts):
  Utli to fill the `PaginateRequest` from the query filter parameters.
    
  ```typescript
  @Get()
  async list(
      @Query() filter: FilterDtoType,
      @Req() request: any
  ): Promise<ListDtoType> {
      const paginateRequest = fillPaginateRequestFromQuery(filter);
  ```