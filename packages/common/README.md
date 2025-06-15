aequum NestJS common components
===============================

In this pagage you can find the all de shared common unclasified 
components used in the aequum over NestJS.


Components
----------


### Enums

- [`HttpResponseDescriptions`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/common/enums/http-response-descriptions.enum.ts): Descriptions for HTTP responses, used for HTTP outputs of [`@aequum/exceptions`](http://npmjs.org/package/@aequum/exceptions) package.


### Utils

- [`module`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/common/utils/module.util.ts) workspace
    - `toArray()`: Converts an `import *` module to an array 
      of components of the module.
    - `toFlattenArray()`: Converts an `import *` module
      recursively if have an `import *` inside to a flattened
      array of components of the module.
- [`swagger`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/common/utils/swagger.util.ts) workspace
    - `patchDocumentViaSwaggerExplorer`: Patches the document by monkey patching the `SwaggerExplorer` class in the method `generateDenormalizedDocument`, see the function for more details.
    - `authModName`: Returns the swagger authorization module name, can be use alias like `oauth` or `oauth2` to refers to `OAuth2` or `jwt` to refers to `Bearer`.
    