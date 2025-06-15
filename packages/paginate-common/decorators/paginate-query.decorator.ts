import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { PaginateRequest } from '../interfaces/paginate-request.interface';
import { fillPaginateRequestFromQuery } from '../utils/query.util';


/**
 * An attempt of parameter decorator to extract the pagination parameters
 * from the request query, but it's not working as expected.
 *
 * @decorator
 */
export const PaginateQuery = () => createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): PaginateRequest => {
        let query: Record<string, unknown>;

        switch (ctx.getType()) {
            case 'http':
                const request: any = ctx.switchToHttp().getRequest();
                query = request.query as Record<string, unknown>;
                break;
            case 'ws':
                query = ctx.switchToWs().getData();
                break;
            case 'rpc':
                query = ctx.switchToRpc().getData();
                break;
        }

        return fillPaginateRequestFromQuery(query);
    }
)();
