import { useState, useEffect, useRef } from "react";
import useKey from "../hooks/useKey";
import { MovieDetailT, WatchedMovieT } from "../type";
import { fetchMovieDetail } from "../utils";
import { Loader } from "../components/BasicComponents";
import StarRating from "../components/StarRating";

export function SelectedMovie({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
}: {
  selectedId: string;
  watched: WatchedMovieT[];
  onCloseMovie: () => void;
  onAddWatched: (watchedMovie: WatchedMovieT, isUpdate: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState<MovieDetailT>();
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;
  const [userRating, setUserRating] = useState(Number(watchedUserRating) || 0);
  const countRef = useRef(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetail || {};

  useKey("Escape", onCloseMovie);
  useEffect(() => {
    async function _fetchMovieDetail() {
      setIsLoading(true);
      try {
        const res = await fetchMovieDetail(selectedId);
        if (res) {
          setMovieDetail(res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    void _fetchMovieDetail();
  }, [selectedId]);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(" ")[0]),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie, isWatched);
    onCloseMovie();
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title || ""} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                defaultRating={Number(watchedUserRating || 0)}
                onSetRating={setUserRating}
              />
              {(isWatched || userRating > 0) && (
                <button className="btn-add" onClick={handleAdd}>
                  + {`${isWatched ? "Update Rating" : "Add to list"}`}
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
