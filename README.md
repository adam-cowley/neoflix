# Neo4j & your favorite React framework

Frameworks:

* [Astro](apps/astro)
* [Next.js](apps/next)


## Motivation

I work in Dev Rel for [Neo4j](https://neo4j.com) and my language of choice is JavaScript/Node.js/TypeScript.  With Neo4j being a database, and most JS/TS developers being more interested in front-end frameworks, it makes my life a little difficult.  You can build a nice UI in React, Vue, etc. but regardless of the front-end framework you use, the backend integration is always the same.

> Install `neo4j-driver`, import the dependency, create a driver instance.  Then open a new session, execute some Cypher statement in a read or write transasction, handle the result, close the session.

So it makes it hard to produce an example that front-end developers can get excited about.

I have written courses for [GraphAcademy](https://graphacademy.neo4j.com/?ref=github) on [Building Neo4j Applications with TypeScript](https://graphacademy.neo4j.com/courses/app-typescript/?ref=github) and [Building Neo4j Applications with Node.js](https://graphacademy.neo4j.com/courses/app-nodejs/?ref=github), courses in the [Developer Learning Path](https://graphacademy.neo4j.com/categories/developer/?ref=github) which use a fictional client called _Neoflix_ as an example.

As you progress through the courses, you replace hardcoded API responses with data from a [Neo4j Sandbox](https://neo4j.com/sandbox) instance.  The projects all serve an SPA written in Vue.js which calls an API written in one of the officially supported languages, which follows the same specification.

It's the connection between API and database that should be interesting for someone developing an application with Neo4j, the UI functionality itself is arbitrary.

So I thought, how can I achieve the goal of providing front-end examples in _{framework of your choice}_ without repeating the same code over and over?

## Monorepo

This repository is a [Monorepo](https://en.wikipedia.org/wiki/Monorepo) that contains two packages that share commonly used code:

* [`packages/core`](packages/core) - TypeScript types and Neo4j integration - think of this as _domain services_ in a DDD model
* [`packages/ui`](packages/ui) - React UI Components used to construct the Neoflix home page

These packages are imported into the [apps](apps/) and used to create a working app.

Each app serves the same homepage, which lists the most popular movies and latest releases in the database (using the [recommendations data set](https://sandbox.neo4j.com?usecase=recommendations)). Each movie has a button visible on hover that allows the user to add a movie to their favorites, creating a `:HAS_FAVORITE` relationship between the `(:User)` and `(:Movie)` nodes in the database.

## Is your framework missing?

Would you like to see an example for your favorite framework here?  Feel free to open a new Issue.  A Pull Request would also be greatly appreciated.


## Get in touch

If you have any questions, feel free to [reach out to me on Twitter](https://twitter.com/adamcowley)
