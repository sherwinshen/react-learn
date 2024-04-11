import { useState, useEffect } from "react";
import { WatchedMovieT } from "../type";

const WATCHED = "watched";

export default function useWatchMovies() {
  const [watched, setWatched] = useState<WatchedMovieT[]>(() => {
    const storedValue = localStorage.getItem(WATCHED);
    if (!storedValue) return [];
    return JSON.parse(storedValue) as WatchedMovieT[];
  });

  useEffect(() => {
    localStorage.setItem(WATCHED, JSON.stringify(watched));
  }, [watched]);

  const handleAddWatched = (watchedMovie: WatchedMovieT, isUpdate: boolean) => {
    if (isUpdate) {
      setWatched((watched) => {
        return watched.map((movie) => {
          return movie.imdbID === watchedMovie.imdbID ? watchedMovie : movie;
        });
      });
      return;
    }
    setWatched((watched) => [...watched, watchedMovie]);
  };
  const handleDeleteWatched = (id: string) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return {
    watched,
    handleAddWatched,
    handleDeleteWatched,
  };
}
