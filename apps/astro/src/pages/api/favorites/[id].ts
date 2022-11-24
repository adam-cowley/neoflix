import type { APIRoute } from "astro";
import { add, remove } from '@neoflix/core/favorites'

export const post: APIRoute = async ({ params, request }) => {
    try {
        // TODO: Get user from middleware
        const userId = request.headers.get('x-user') as string
        const { id } = params

        const result = await add(userId, id as string)

        return {
            status: 201,
            body: JSON.stringify({
                status: 'OK',
                ...result,
            }),
        }
    }
    catch (e: any) {
        return {
            status: e.code || 500,
            body: JSON.stringify({
                status: 'ERROR',
                message: e.message,
            }),
        }
    }
}

export const del: APIRoute = async ({ params, request }) => {
    try {
        // TODO: Get user from middleware
        const userId = request.headers.get('x-user') as string
        const { id } = params

        const result = await remove(userId, id as string)

        return {
            status: 202,
            body: JSON.stringify({
                status: 'OK',
                ...result,
            }),
        }
    }
    catch (e: any) {
        return {
            status: e.code || 500,
            body: JSON.stringify({
                status: 'ERROR',
                message: e.message,
            }),
        }
    }
}
