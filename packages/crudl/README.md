aequum NestJS CRUD/CRUDL operations components
==============================================

This package provides CRUD/CRUDL (**C**reate, **R**ead, **U**pdate,
**D**elete, **L**ist) controllers to use with the 
[`@aequum/crudl`](http://npmjs.org/package/@aequum/crudl) services and
 its implementations like
[`@aequum/mongoose`](http://npmjs.org/package/@aequum/mongoose),
[`@aequum/typeorm`](http://npmjs.org/package/@aequum/typeorm),
[`@aequum/in-memory`](http://npmjs.org/package/@aequum/in-memory), etc.
to provide a complete CRUDL API.

Each controller will have:
- Endpoints for CRUDL operations:
  - Create: `POST /`
  - Read: `GET /:id`
  - Update: `PATCH /:id`
  - Delete: `DELETE /:id`
  - List: `GET /` (with pagination if needed)
- Swagger documentation for each endpoint
- Validation for input data using DTOs
- Configurable ID field name and pipe
- Able to use decorators in each endpoint
- Transform functions for input and output data

For more details see the [`CRUDLControllerOptions`](#components) below.

Use
----
### Install the module
To use the CRUDL module, you must install the package
`@aequum/nestjs-crudl`:

```bash
pnpm install @aequum/nestjs-crudl
```

### Prerequisite: CRUDL service

More information in the [`@aequum/crudl`](http://npmjs.org/package/@aequum/crudl) package.

### Add the controller in the application

Here an example of a controller using the CRUDL service:

```typescript
// imports...

@ApiTags('Organization')
@RoleAccessTo(Roles.admin)
@Controller('organizations')
export class OrganizationsController extends CRUDLPaginatedController(
    OrganizationDto,
    OrganizationPaginatedListDto,
    OrganizationCreateDto,
    OrganizationUpdateDto, 
    null, {
        name: {
            singular: 'organization',
            plural: 'organizations',
        },
        id: {
            type: String,
            validationPipe: ParseObjectIdPipe,
            routeParam: 'organizationId',
        },
        auth: 'bearer',
        applyDecorators: {
            list: [
                RoleAccessTo(Roles.client),
            ],
            retrieve: [
                RoleAccessTo(Roles.client),
                OrganizationMemberFromArg(0)
            ],
            update: [
                RoleAccessTo(Roles.client),
                OrganizationMemberFromArg(0)
            ]
        },
        transform: {
            filter: { input: (filter: any, req: any) => {
                // If the user is a client, filter by the user's organizations
                if (req.user?.role === Roles.client)
                    Object.assign(filter, { id: req.user.organizations });
            }}
        }
    }) {
    constructor(public readonly service: OrganizationsService) {
        super();
    }
}
```

Examples
--------

See the [exapmle in our boilerplate](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth%2Btypeorm/src/application/api/examples/controllers/examples.controller.ts) for a simple CRUDL controller.


Components
----------

### Controllers
- [`CRUDLController`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/crudl/controllers/crudl.controller.ts): Abstract class to implement CRUDL operations in a controller.
- [`CRUDLPaginatedController`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/crudl/controllers/paginated/crudl-paginated.controller.ts) Abstract class which extends from `CRUDLController` to implement CRUDL operations with pagination in a controller.


### Types

- [`CRUDLControllerOptions`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/crudl/types/crudl.types.ts):
Options for the CRUDL controller, used to configure the controller.