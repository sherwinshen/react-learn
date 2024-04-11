import { useState } from "react";
import { ContentBox, Loader, ErrorMessage } from "./components/BasicComponents";
import { NavBar, Search, NumResults } from "./components/NavBar";
import { SearchedMovies } from "./components/SearchedMovies";
import { WatchedMovies } from "./components/WatchedMovies";
import { WatchedSummary } from "./components/WatchedSummary";
import { SelectedMovie } from "./components/SelectedMovie";
import useSearchMovies from "./hooks/useSearchMovies";
import useSelectMovie from "./hooks/useSelectMovie";
import useWatchMovies from "./hooks/useWatchMovies";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, error, movies } = useSearchMovies(query);
  const { selectedId, handleSelectMovie, handleCloseMovie } = useSelectMovie();
  const { watched, handleAddWatched, handleDeleteWatched } = useWatchMovies();

  return (
    <>
      <NavBar>
        <>
          <Search query={query} setQuery={setQuery} />
          <NumResults movies={movies} />
        </>
      </NavBar>
      <main className="main">
        <ContentBox>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <SearchedMovies movies={movies} onSelectMovie={handleSelectMovie} />}
        </ContentBox>
        <ContentBox>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            ></SelectedMovie>
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMovies
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
                onSelectMovie={handleSelectMovie}
              ></WatchedMovies>
            </>
          )}
        </ContentBox>
      </main>
    </>
  );
}

export default App;
