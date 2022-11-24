import { Router } from 'express'
import { all } from '@neoflix/core/movies'
import { pagination } from '../utils'

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const { sort, order, limit, skip } = pagination(req)

        const movies = await all(sort as string | undefined, order, limit, skip)

        res.json(movies)
    }
    catch (e) {
        next(e)
    }
})

export default router
