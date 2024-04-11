import { useState, useEffect, useRef } from "react";
import { MovieT } from "../type";
import { fetchMovies } from "../utils";

export default function useSearchMovies(query: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<MovieT[]>([]);

  const loadingCount = useRef(0); // 用于解决多此接口请求导致loading状态消失

  useEffect(() => {
    const controller = new AbortController();
    async function _fetchMovies() {
      loadingCount.current += 1;
      setIsLoading(true);
      setError("");
      try {
        const res = await fetchMovies(query, controller.signal);
        if (res) {
          setMovies(res);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err?.message || "");
        }
      } finally {
        loadingCount.current -= 1;
        if (loadingCount.current === 0) {
          setIsLoading(false);
        }
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    void _fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return {
    isLoading,
    error,
    movies,
    setMovies,
  };
}
