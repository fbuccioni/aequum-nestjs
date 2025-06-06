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
 * Patch the document by monkey patching the `SwaggerExplorer` class in the
 * method `generateDenormalizedDocument`.
 *
 * @param generateDenormalizedDocument
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
    return auth[0].toUpperCase() + auth.slice(1);
}
