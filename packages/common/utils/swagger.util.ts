/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SwaggerExplorer } from "@nestjs/swagger/dist/swagger-explorer";


type GenerateDenormalizedDocument = (
    document: any[],
    metatype: any,
    prototype: any,
    instance: any,
    documentResolvers: any,
    applicationConfig: any,
    options: any
) => any;

/**
 * Patch the document by monkey patching the `SwaggerExplorer`
 * class in the method `generateDenormalizedDocument`
 *
 * **NOTE**: This function musb be called once
 *
 * @param generateDenormalizedDocument
 * @example ```
 * // Excample to patch a route param
 *
 * // Controller file
 * @ApiTags('Data set')
 * @Controller('data')
 * export class DataController {
 *     @ApiParam({
 *         name: 'path',
 *         description: 'Path for the dataset',
 *         required: true,
 *         allowReserved: true,
 *         schema: { type: 'string', pattern: '^[a-z0-9_/-]+$' },
 *     })
 *     @ApiResponse({
 *         status: 200,
 *         description: `The data set data retrieved successfully.`,
 *     })
 *     @Get('*')
 *     async dataRoute(
 *         @Param('*') path: string,
 *     ): Promise<{ data: JSON }> {
 *         // ...
 *     }
 * }
 *
 * // Swagger patch file to load, the function must be
 * // called once
 * import { swagger } from '@aequum/nestjs-common/utils';
 *
 * swagger.patchDocumentViaSwaggerExplorer(function (document, metatype) {
 *   if (metatype.name === 'DataController') {
 *       document[0].root.path = document[0].root.path.replace(
 *           /\*$/,
 *           '{path}',
 *       );
 *       document[0].root.parameters =
 *           document[0].root.parameters.filter((p) => p.name !== '*');
 *
 *   return document;
 * });
 */
export function patchDocumentViaSwaggerExplorer(generateDenormalizedDocument: GenerateDenormalizedDocument) {
    // @ts-ignore
    const oldFn = SwaggerExplorer.prototype.generateDenormalizedDocument;

    // @ts-ignore
    SwaggerExplorer.prototype.generateDenormalizedDocument = function(...args: any[]) {
        return generateDenormalizedDocument.call(
            this,
            oldFn.apply(this, args),
            // @ts-ignore
            ...args
        );
    }
}

/**
 * Get NestJS Swagger auth type name with some aliases
 *
 * @param auth - Auth type
 */
export function authModName(auth: string) {
    if (auth === 'jwt') return 'Bearer';
    if (auth === 'oauth2') return 'OAuth2';
    if (auth === 'oauth') return 'OAuth2';
    return auth[0].toUpperCase() + auth.slice(1);
}
