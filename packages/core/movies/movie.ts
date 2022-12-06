export interface Movie {
    tmdbId: string;
    imdbId: string;
    title: string;
    poster: string;
    languages: string[] | undefined;
    year: number;
    released: string;
    runtime: number;
    movieId: string;
    countries: string[] | undefined;
    imdbRating: number;
    imdbVotes: number;
    url: string;
    revenue: number;
    plot: string;
    budget: number;
    favorite?: boolean;
}
