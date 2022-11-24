import { NextApiRequest, NextApiResponse } from 'next'
import { add, remove } from '@neoflix/core/favorites'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // TODO: Authentication
        const userId: string = req.headers['x-user'] as string
        const movieId: string = req.query.id as string

        if ( req.method === 'POST' ) {
            const result = await add(userId, movieId)

            return res.status(201).json({
                status: 'OK',
                ...result,
            })
        }
        else if ( req.method === 'DELETE' ) {
            const result = await remove(userId, movieId)

            return res.status(202).json({
                status: 'OK',
                ...result,
            })
        }

        return res.status(404).send({
            status: 'ERROR',
            message: `Cannot ${req.method} ${req.url}`,
        })
    }
    catch (e: any) {
        res.status(500).send({
            status: e.code || 'ERROR',
            message: e.message,
        })
    }
}
