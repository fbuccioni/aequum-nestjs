aequum NestJS mongoose tools
============================

Just a simple package to provide NestJS tools for mongoose.


Components
----------

### Decorators

- [`@VirtualID()`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/mongoose/decorators/virtual-id.decorator.ts): 
To create a Schema with `id` instead of MongoDB `_id` field, it must be
used with [`schemaTransformsForVirtualID()`](https://www.npmjs.com/package/@aequum/mongoose#utils)
in [`@aequum/mongoose`](https://www.npmjs.com/package/@aequum/mongoose)
package. See the [example in our boilerplate](https://github.com/fbuccioni/aequum-nestjs-hexa/blob/base%2Bauth%2Bmongoose/src/infrastructure/database/schemas/example.schema.ts)


### Pipes

- [`ParseObjectIdPipe`](https://github.com/fbuccioni/aequum-nestjs/blob/main/packages/mongoose/pipes/parse-object-id.pipe.ts):
  Pipe to parse a string to a MongoDB ObjectId, it can be used in the
  controller route parameters, like this:
    
   ```typescript
    @Get(':id')
    async findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
        return this.service.findOne(id);
    }
    ```