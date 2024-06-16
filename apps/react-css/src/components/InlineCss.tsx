import { useState } from "react";

const commonStyles = {
  fontSize: "20px",
};

function InlineCss() {
  const [isHighlighted, setIsHighlighted] = useState(false);

  return (
    <>
      <div
        style={{
          ...commonStyles,
          color: "red",
          backgroundColor: isHighlighted ? "yellow" : "initial",
        }}
      >
        Hello! Welcome to my world!
      </div>
      <button onClick={() => setIsHighlighted(!isHighlighted)}>click</button>
    </>
  );
}

export default InlineCss;
