import { useState } from "react";

export default function useSelectMovie() {
  const [selectedId, setSelectedId] = useState("");
  const handleSelectMovie = (id: string) => {
    setSelectedId(id);
  };
  const handleCloseMovie = () => {
    setSelectedId("");
  };

  return { selectedId, handleSelectMovie, handleCloseMovie };
}
