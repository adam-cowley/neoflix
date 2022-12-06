import React, { ReactNode, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Grid, GridItem, GridItemProps, Hero, Section } from '@neoflix/ui'
import type { Movie } from '@neoflix/core'
import FavoriteToggle from '../components/FavoriteToggle';
import User from '@neoflix/core/auth/user';


const TOP_MOVIES = gql`
  query ($topOptions: MovieOptions, $latestOptions: MovieOptions) {
    popular: movies(options: $topOptions) {
      tmdbId
      poster
      title
      languages
      imdbRating
      released
      favorite
    }
    latest: movies(options: $latestOptions) {
      tmdbId
      poster
      title
      languages
      imdbRating
      released
      favorite
    }
  }
`

const variables = {
  "topOptions": {
    "sort": {
      "imdbRating": "DESC"
    },
    "limit": 6
  },
  "latestOptions": {
    "sort": {
      "released": "DESC"
    },
    "limit": 6
  }
}


function GridPlaceholder() {
  return <Grid>
    {[...new Array(6)].map((_, index) => <GridPlaceholderItem key={index} />)}
  </Grid>
}

function GridPlaceholderItem() {
  return <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
    <div className="card">
      <img src="/img/poster-placeholder.png" alt="Loading..." />
    </div>
  </div>
}

function useUser(): { user: User } {
  return {
    user: {
      id: '19',
      name: 'Foo Bar',
      email: 'graphacademy@neo4j.com'
    }
  }
}

const movieToGridItem = (movie: Movie): GridItemProps => ({
  id: movie.tmdbId,
  link: `/movies/${movie.tmdbId}`,
  poster: movie.poster,
  title: movie.title,
  tags: movie.languages ? movie.languages.map(language => ({ text: language })) : [],
})

interface TopMoviesResult {
  popular: Movie[];
  latest: Movie[];
}

export default function Home() {
  const { loading, error, data } = useQuery<TopMoviesResult>(TOP_MOVIES, {
    variables
  })

  // TODO: Get user
  const { user } = useUser()


  // items={data.popular.map(movie => movieToGridItem(movie))}
  let popular = <GridPlaceholder />

  if ( data && data.popular ) {
    popular = <Grid>
      {data.popular.map(movie =>
        <GridItem
          key={movie.tmdbId}
          {...movieToGridItem(movie)}
        >
          <FavoriteToggle
            {...movieToGridItem(movie)}
            user={user}
          />
        </GridItem>
      )}
    </Grid>
  }


  const latest = data ? <Grid items={data.latest.map(movie => movieToGridItem(movie))} />
    : <GridPlaceholder />




  return (
    <>
      <Hero
        title="Graph Powered Movie Recommendations"
        text="Using the power of Graph Databases and Cypher to serve you real-time recommendations."
      >
        <div className="article__btns">
          <a href="/register" className="article__btn">Register Now</a>
          <a href="/genres" className="article__btn article__btn--white">Browse Genres</a>
        </div>
      </Hero>

      <Section title='Most Popular Movies'>
        {popular}

      </Section>

      <Section title='Latest Releases'>
        {latest}
      </Section>
    </>
  )
}