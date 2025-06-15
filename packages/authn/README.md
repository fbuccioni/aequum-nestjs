aequum NestJS authentication module
===================================

The module is designed to provide easy authentication services for the 
application, it uses JWT for authentication via passport-jwt strategy 
and provides user registration, login and password hashing for user 
credential.

Use
----

### Install the module

To use the authentication module, you must install the package
`@aequum/nestjs-authn`:

```bash
pnpm install @aequum/nestjs-authn
```

### Create the user defined components

To implement the authentication module, you must implement some classes 
in order to provide the authentication functionality for the app. 

We provide a boilerplate with ready to use files, in the following list 
you can find the files that you must implement in your application.

User defined components are:

1. [User model](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/domain/models/user.model.ts)
2. [User service](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/services/users.service.ts)
3. [Authentication service](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/services/auth.service.ts)
4. [Passport strategy (JWT)](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/api/auth/passport/strategies/jwt.strategy.ts)
5. [Authentication controller](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/api/auth/controllers/auth.controller.ts)
6. [Authentication NestJS module](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/api/auth/auth.module.ts)


### Add the guard in the application

To use the authorization module, you must add the `JWTGuard` in your
main application module.

See the [exapmle in our boilerplate](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/api/app.module.ts)


### Configure

By default the services reads configuration from `ConfigService` with 
the prefix `authentication.` it means root property `authentication` in
the configuration object, implementing the [`AuthnConfiguration`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/interfaces/authn-configuration.interface.ts) 
interface, this can be configured in `AuthnService` by the static property `configPrefix`.

See the [configuration in our boilerplate](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth/src/application/api/configuration.ts),
to get an example.


Components
-----------


### Controllers

- [`AuthController`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/controllers/authn.controller.ts):
Abstract class to [implmement](#create-the-user-defined-components) and
handle login and token refresh.


### Decorators

**Can be used in the whole controller class or in a endpoint method.**

- `@Public()`: Marks controller or method as public, meaning it does not require authentication.
- `@RequireAuthentication()`: Marks controller or method as requiring authentication, meaning it requires a valid JWT token.

### DTOs

[`class-validator`](http://npmjs.com/package/class-validator) models to 
validate the inputs/outputs.

- [`LoginDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/dtos/login.dto.ts)
- [`TokenDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/dtos/token.dto.ts)
- [`TokenRefreshDto`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/dtos/token-refresh.dto.ts)


### Exceptions

Via [`@aequum/exceptions`](https://npmjs.com/package/@aequum/exceptions) package,

- [`AuthenticationFailException`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/exceptions/authentication-fail.exception.ts)
- [`TokenExpiredException`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/exceptions/token-expired.exception.ts)


### Guards

- [`JWTGuard`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/guards/jwt.guard.ts)


### Interfaces

- [`AuthCompliantUsersService`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/interfaces/auth-compliant-users-service.interface.ts):
Interface for user service compliant with authentication module.
- [`AuthRefreshTokenCompliantUsersService`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/interfaces/auth-refresh-token-compliant-users-service.interface.ts):
Extends from `AuthCompliantUsersService` and adds methods for refresh token
management.
- [`AuthnConfiguration`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/interfaces/authn-configuration.interface.ts): 
Interface for authentication module configuration.

### Models

- [`JwtPayload`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/models/jwt-payload.model.ts): 
[`class-validator`](http://npmjs.com/package/class-validator) model
representing the payload of a JWT token, used by `JwtStrategy` to validate
the tokens.

### Passport

- `passport` workspace
  - `strategies` workspace
    - [`JwtStrategy`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/passport/strategies/jwt.strategy.ts):
    Abstract class to [implmement](#create-the-user-defined-components)
    JWT strategy in app and add it to the container.

### Services

- [`AuthnService`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/services/authn.service.ts):
Abstract authentication service class to
[implmement](#create-the-user-defined-components) in the application 
and add it to conatiner.

### Types

- [`ServiceUserFieldsMap`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/authn/types/service-user-fields-map.type.ts):
A map of fields from the user model to use in the authentication services.
