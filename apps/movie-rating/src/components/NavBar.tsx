import { useRef } from "react";
import { MovieT } from "../type";
import useKey from "../hooks/useKey";

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export function Search({ query, setQuery }: { query: string; setQuery: (query: string) => void }) {
  const inputEl = useRef<null | HTMLInputElement>(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export function NumResults({ movies }: { movies: MovieT[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
