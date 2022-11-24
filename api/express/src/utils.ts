import { Request } from 'express'

const ORDER_ASC = 'ASC'
const ORDER_DESC = 'DESC'

type Order = typeof ORDER_ASC | typeof ORDER_DESC | undefined

interface Pagination {
    sort: string | undefined;
    order: Order;
    limit: number | undefined;
    skip: number | undefined;
}

export function pagination(req: Request): Pagination {
    return {
        sort: req.query.sort as string || undefined,
        order: req.query.order && [ORDER_ASC, ORDER_DESC].includes(req.query.order as string) ? req.query.order as Order : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        skip: req.query.skip ? parseInt(req.query.order as string) : undefined,
    }
}