import { Router } from 'express'
import { add, remove } from '@neoflix/core/favorites'

const router = Router()

router.post('/:movieId', async (req, res, next) => {
    try {
        // TODO: Get user from auth middleware
        const userId = '1'
        const movieId = req.params.movieId

        const output = await add(userId, movieId)

        res.status(201).json(output)
    }
    catch (e) {
        next(e)
    }
})

router.delete('/:movieId', async (req, res, next) => {
    try {
        // TODO: Get user from auth middleware
        const userId = '1'
        const movieId = req.params.movieId

        const output = await remove(userId, movieId)

        res.status(202).json(output)
    }
    catch (e) {
        next(e)
    }
})

export default router
