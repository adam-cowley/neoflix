import Head from 'next/head'
import Image from 'next/image'

import { all } from '@neoflix/core/movies'
import type { Movie } from '@neoflix/core/movies'

import Hero from '@neoflix/ui/hero'
import Section from '@neoflix/ui/section'
import Grid from '@neoflix/ui/grid'
import type { GridItemProps } from '@neoflix/ui/grid/item'
import User from '@neoflix/core/auth/user'
import { toNativeTypes } from '@neoflix/core/utils'
import GridItem from '@neoflix/ui/grid/item'
import FavoriteToggle from '../components/FavoriteToggle'

interface HomeProps {
  popular: GridItemProps[];
  latest: GridItemProps[];
  user?: User;
}

const convertMovieToGridItem = (movie: Movie, user: User) => toNativeTypes({
	id: movie.tmdbId,
	link: `/movies/${movie.tmdbId}`,
	poster: movie.poster || '/img/poster-placeholder.png',
	title: movie.title,
	tags: movie.languages?.map((language: string) => ({ text: language, })) || [],
	rating: movie.imdbRating,
	favorite: movie.favorite,
	user,
})


export async function getServerSideProps() {
  // TODO: Get user from auth
  const user = {
    id: '1',
    name: 'Adam',
    email: 'adam@graphacademy.com'
  }

  const popular: GridItemProps[] = (await all('imdbRating', 'DESC', 6, 0, user.id))
    .map(movie => convertMovieToGridItem(movie, user))

  const latest = (await all('released', 'DESC', 6, 0, user.id))
    .map(movie => convertMovieToGridItem(movie, user))

  return {
    props: {
      user,
      popular,
      latest,
    }
  }
}


export default function Home({ popular, latest, user }: HomeProps) {
  return (
    <>
      <Head>
        <title>[Next.js] Neoflix - Graph Powered Movie Recommendations</title>
      </Head>
      <Hero
        title="Graph Powered Movie Recommendations"
        text="Using the power of Graph Databases and Cypher to serve you real-time recommendations."
      >
        <div className="article__btns">
          <a href="/register" className="article__btn">Register Now</a>
          <a href="/genres" className="article__btn article__btn--white">Browse Genres</a>
        </div>
      </Hero>

      <Section title="Most Popular Movies">
        <Grid>
        {popular.map(item => <GridItem {...item}>
					<FavoriteToggle {...item} user={user} />
				</GridItem>)}
        </Grid>
		  </Section>

      <Section title="Latest Releases">
        <Grid>
        {latest.map(item => <GridItem {...item}>
					<FavoriteToggle {...item} user={user} />
				</GridItem>)}
        </Grid>
		  </Section>
    </>
  )
}
