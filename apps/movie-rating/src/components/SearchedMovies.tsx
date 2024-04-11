import { MovieT } from "../type";

function MovieDetail({ movie, onSelectMovie }: { movie: MovieT; onSelectMovie: (imdbID: string) => void }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export function SearchedMovies({
  movies,
  onSelectMovie,
}: {
  movies: MovieT[];
  onSelectMovie: (imdbID: string) => void;
}) {
  return (
    <ul className="list list-movies">
      {(movies || []).map((movie) => (
        <MovieDetail key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie}></MovieDetail>
      ))}
    </ul>
  );
}
