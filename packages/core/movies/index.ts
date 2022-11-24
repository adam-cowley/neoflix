import { int, ManagedTransaction } from "neo4j-driver"
import { openSession } from "../neo4j"
import { toNativeTypes } from "../utils"
import { Movie } from "./movie"

// tag::getUserFavorites[]
async function getUserFavorites(tx: ManagedTransaction, userId: string | null = null) {
    // If userId is not defined, return an empty array
    if (userId === undefined) {
        return []
    }

    const favoriteResult = await tx.run(
        `
        MATCH (:User {userId: $userId})-[:HAS_FAVORITE]->(m)
        RETURN m.tmdbId AS id
      `,
        { userId, }
    )

    // Extract the `id` value returned by the cypher query
    return favoriteResult.records.map(
        row => row.get('id')
    )
}
// end::getUserFavorites[]

export async function all(sort = 'title', order = 'ASC', limit = 6, skip = 0, userId: string | undefined = undefined): Promise<Movie[]> {
    // Open an Session
    const session = await openSession()

    // tag::allcypher[]
    // Execute a query in a new Read Transaction
    const res = await session.executeRead(
        async tx => {
            const favorites = await getUserFavorites(tx, userId)

            return tx.run<{ movie: Movie }>(
                `
                    MATCH (m:Movie)
                    WHERE m.\`${sort}\` IS NOT NULL
                    RETURN m {
                        .*,
                        favorite: m.tmdbId IN $favorites
                    } AS movie
                    ORDER BY m.\`${sort}\` ${order}
                    SKIP $skip
                    LIMIT $limit
                `,
                { skip: int(skip), limit: int(limit), favorites }
            )
        }
    )
    // end::allcypher[]

    // tag::allmovies[]
    // Get a list of Movies from the Result
    const movies = res.records.map(
        row => toNativeTypes<Movie>(row.get('movie'))
    )
    // end::allmovies[]

    // Close the session
    await session.close()

    // tag::return[]
    return movies
    // end::return[]
}

export { Movie }