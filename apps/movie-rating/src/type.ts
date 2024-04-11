export type MovieT = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export type MovieDetailT = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
  imdbRating: string;
};

export type WatchedMovieT = {
  imdbID: string;
  title?: string;
  year?: string;
  poster?: string;
  imdbRating: number;
  runtime: number;
  userRating: number;
  countRatingDecisions: number;
};
