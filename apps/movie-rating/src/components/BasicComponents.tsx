import { useState } from "react";

export function ContentBox({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export function Loader() {
  return <p className="loader">Loading...</p>;
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
