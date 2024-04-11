import { MovieT, MovieDetailT } from "./type";

// TODO 写到环境变量
const apiKey = "f84fc31d";

export async function fetchMovies(query: string, signal: AbortSignal) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, { signal });
  if (!res.ok) throw new Error("Something went wrong with fetching movies");
  const data = (await res.json()) as {
    Response: string;
    Search: MovieT[];
    totalResults: number;
  };
  if (data.Response === "False") throw new Error("Movie not found");
  return data.Search;
}

export async function fetchMovieDetail(selectedId: string) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);
  const data = (await res.json()) as MovieDetailT;
  return data;
}
