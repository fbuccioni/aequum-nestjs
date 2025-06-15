aequum NestJS authorization module
===================================

The module is designed to provide easy and simple RBAC (Role-Based
Access Control) to the app.

Use
----

### Install the module

To use the authorization module, you must install the package
`@aequum/nestjs-authz`:

```bash
pnpm install @aequum/nestjs-authz
```


### Prerequisite: User role property

The authorization module requires the user model to have a role property, by default is `role`, but you can change it in the configuration.


### Add the guard in the application

To use the authorization module, you must add the `JWTGuard` in your
main application module.

See the [exapmle in our boilerplate](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/api/app.module.ts)
(Yes, are the commented lines)


### Configure

By default the services reads configuration from `ConfigService` with 
the prefix `authorization.` it means root property `authorization` in
the configuration object, implementing the [`AuthzConfiguration`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authz/interfaces/authz-configuration.interface.ts) 
interface, this can be configured in `RBACGuard` by the static property `configPrefix`.

See the [configuration in our boilerplate](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/api/configuration.ts),
to get an example.


Components
-----------


### Controllers

- [`AuthController`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authz/controllers/authz.controller.ts):
Abstract class to [implmement](#create-the-user-defined-components) and
handle login and token refresh.


### Decorators

**Can be used in the whole controller class or in a endpoint method.**

- `@FreeAccess()`: Marks controller or method as free access, meaning it does not require authorization, this is mandatory over other decorators.
- `@RoleAccessTo(...roles)`: Only the roles in the arguments are allowed to access this controller or method .
- `@DeniedToRoles(...roles)`: Denies access to the roles in the arguments, this is mandatory over `@RoleAccessTo`.


### Guards

- [`RBACGuard`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authz/guards/rbac.guard.ts):
The main guardian of this module.


### Interfaces

- [`AuthzConfiguration`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authz/interfaces/authz-configuration.interface.ts): 
Interface for authorization module configuration.


### Services

- [`AuthnService`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authz/services/authz.service.ts):
Abstract authorization service class to
[implmement](#create-the-user-defined-components) in the application 
and add it to conatiner.

### Types

- [`Policies`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authz/types/policies.type.ts):
Policy to use when no access are defined by decorators.

- [`WhenNoUserActions`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authz/types/when-no-user-actions.type.ts): What to do when no user is found in the request.
