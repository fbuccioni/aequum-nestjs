// noinspection JSCommentMatchesSignature

import { ForbiddenException, Get, Query, Req, } from '@nestjs/common';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BaseCRUDLPaginatedService } from "@aequum/crudl";
import { ClassConstructor } from "@aequum/types";
import { fillPaginateRequestFromQuery } from "@aequum/nestjs-paginate-common/utils";
import { PaginateQueryWithFilterDto } from "@aequum/nestjs-paginate-common/dtos";

import { CRUDLControllerOptions } from '../../interfaces';
import * as CRUDLUtil from '../../utils/crudl.util'
import { CRUDLController, SharedListDtoType } from "../../controllers/crudl.controller";


/**
 * Factory function to create a CRUDLController class, a controller with CRUDL operations.
 *
 * The generated controller will have:
 * - HTTP return codes
 * - Swagger decorators `@ApiOperation` and `@ApiResponse`
 * - Properly typed parameters for input and output of the methods
 * - Properly typed parameters for the ID and body
 *
 * NOTE: All types will be processed with `InstanceType` to get the correct type to work with.
 *
 * @typeParam ModelDtoType - Type from `ModelDto` parameter. (`typeof ModelDto`)
 * @typeParam ModelCreateDtoType - Type from `ModelCreateDto` parameter. (`typeof ModelCreateDto`)
 * @typeParam ModelUpdateDtoType - Type from `ModelUpdateDto` parameter. (`typeof ModelUpdateDto`)
 * @typeParam ModelPaginatedListType - Type from `ModelPaginatedListDto` parameter. (`typeof ModelPaginatedListDto`)
 *
 * @param ModelDto - The DTO class for the model.
 * @param ModelCreateDto - The DTO class for creating the model.
 * @param ModelUpdateDto - The DTO class for updating the model.
 * @param ModelFilterDto - The DTO class for filtering the model.
 * @param ModelPaginatedListDto - The DTO class for the paginated list of the model.
 * @param options - The options for the CRUDLController.
 *
 * @returns The CRUDLController class.
 */
export function CRUDLPaginatedController<
    ModelDtoType extends ClassConstructor,
    ModelPaginatedListType extends ClassConstructor,
    ModelCreateDtoType extends ClassConstructor,
    ModelUpdateDtoType extends ClassConstructor,
    ModelFilterDtoType extends ClassConstructor = ClassConstructor,
>(
    ModelDto: ModelDtoType,
    ModelPaginatedListDto: ModelPaginatedListType,
    ModelCreateDto: ModelCreateDtoType,
    ModelUpdateDto: ModelUpdateDtoType,
    ModelFilterDto: ModelFilterDtoType,
    options: CRUDLControllerOptions,
    postProcess: boolean = true
) {

    type FilterDtoType = InstanceType<ModelFilterDtoType>;
    type ListDtoType = SharedListDtoType<ModelPaginatedListType>;

    /**
     * A Controller class with CRUDL operations.
     */
    abstract class CRUDLPaginatedController extends CRUDLController(
        ModelDto, ModelPaginatedListDto, ModelCreateDto, ModelUpdateDto, ModelFilterDto, options, false
    ) {
        /** @inheritDoc */
        public declare readonly service: BaseCRUDLPaginatedService;

        /**
         * Handles the paginated retrieval of all entities.
         *
         * @decorator `@ApiOperation({ summary: `Get all ${options.name.plural} paginated` })`
         * @decorator `@ApiResponse({
         *     status: 200,
         *     description: `Paginated list of ${options.name.plural} retrieved successfully.`,
         *     type: ModelPaginatedListDto,
         * })`
         * @decorator `@Get()`
         * @param filter - Filter object.(The rest of the queryString)
         * @param request - Request object.
         *
         * @returns A promise of the list of entity DTOs.
         */
        @ApiOperation({ summary: `Get all ${options.name.plural} paginated` })
        @ApiResponse({
            status: 200,
            description: `Paginated list of ${options.name.plural} retrieved successfully.`,
            type: ModelPaginatedListDto,
        })
        @Get()
        override async list(
            // @PaginateQuery() paginateRequest: PaginateRequest,
            @Query() filter: FilterDtoType,
            @Req() request: any,
            ...args: any[]
        ): Promise<ListDtoType> {
            if (options.forbid?.list)
                throw new ForbiddenException(`Listing ${options.name.plural} is forbidden.`);

            const paginateRequest = fillPaginateRequestFromQuery(filter);

            await CRUDLUtil.applyTransform(
                options.transform?.filter?.input,
                filter, request, 'list'
            );

            const body = await this.service.paginatedList(
                filter,
                paginateRequest.page,
                paginateRequest.size,
                paginateRequest.sortBy || '',
            ) as Promise<ListDtoType>;

            await CRUDLUtil.applyTransform(
                options.transform?.body?.output,
                filter, request, 'list'
            );

            return body;
        }
    }

    if (postProcess) CRUDLUtil.postProcessClass(
        CRUDLPaginatedController,
        ModelCreateDto,
        ModelUpdateDto,
        PaginateQueryWithFilterDto(ModelFilterDto),
        options
    )

    return CRUDLPaginatedController;
}
