aequum NestJS exceptions module
===============================

Module for NestJS to provide descriptive and rich exceptions using 
[`@aequum/exceptions`](http://npmjs.org/package/@aequum/exceptions)
package.

Show the exception with details as the nature of 
[`@aequum/exceptions`](http://npmjs.org/package/@aequum/exceptions)
and also convert the `class-validator` errors to a `ValidationException`
which is more comprehensive and descriptive.


Use
----

### Install the module
To use the exceptions module, you must install the package
`@aequum/nestjs-exceptions`:

```bash
pnpm install @aequum/nestjs-exceptions
```

### Add the components in the application

We need to add our [`CommonExceptionFilter`](#components) and
[`ValidationPipe`](#components) to the application in the `bootstrap()`
function, like this:

```typescript
import { NestFactory } from '@nestjs/core';
import { 
    CommonExceptionFilter, 
    ValidationPipe 
} from '@aequum/nestjs-exceptions';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new CommonExceptionFilter());
    // ... other configurations
}
```

Components
----------

### Exception Filters

- [`CommonExceptionFilter`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/exceptions/filters/common-exception.filter.ts):
  If the exception derives from `BaseException` from `@aequum/exceptions`
  package, it will return the exception with details.


### Pipes

- [`ValidationPipe`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/exceptions/pipes/validation.pipe.ts): It converts the `class-validator` errors to a `ValidationException`
  from `@aequum/exceptions` package, which is more comprehensive and descriptive.


### Interfaces

- [`HttpException`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/exceptions/interfaces/http-exception.interface.ts):
  Interface for the HTTP exception, used to define the structure of the exception returned by the `CommonExceptionFilter`.



