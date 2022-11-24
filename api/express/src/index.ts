import express from 'express'
import { config } from 'dotenv'

import movieRoutes from './routes/movie.routes'
import favoritesRoutes from './routes/favorites.routes'

config()

const app = express()

app.use('/api/movies', movieRoutes)
app.use('/api/favorites', favoritesRoutes)

app.listen(process.env.APP_PORT || 3000, () => {
    console.log(`Server listening on http://localhost:${process.env.APP_PORT || 3000}`)
})
