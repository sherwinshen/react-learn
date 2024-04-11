import { WatchedMovieT } from "../type";

function WatchedMovie({
  movie,
  onDeleteWatched,
  onSelectMovie,
}: {
  movie: WatchedMovieT;
  onDeleteWatched: (id: string) => void;
  onSelectMovie: (id: string) => void;
}) {
  const handleDeleteWatched = (e: React.MouseEvent) => {
    onDeleteWatched(movie.imdbID);
    e.stopPropagation();
  };
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.poster} alt={`${movie.title || ""} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={handleDeleteWatched}>
          X
        </button>
      </div>
    </li>
  );
}

export function WatchedMovies({
  watched,
  onDeleteWatched,
  onSelectMovie,
}: {
  watched: WatchedMovieT[];
  onDeleteWatched: (id: string) => void;
  onSelectMovie: (id: string) => void;
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
