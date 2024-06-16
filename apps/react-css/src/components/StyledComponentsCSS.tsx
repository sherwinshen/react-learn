import { useState } from "react";
import styled, { css } from "styled-components";

const Title = styled.h1<{ $isHighlight?: boolean }>`
  font-size: 1.5em;
  color: red;
  font-weight: ${(props) => (props.$isHighlight ? "bold" : "normal")};

  &:hover {
    color: yellow;
  }

  .small {
    font-size: 0.5em;
  }

  ${(props) =>
    props.$isHighlight &&
    css`
      background-color: blue;
    `}
`;

console.log(Title);

function StyledComponentsCSS() {
  const [isHighlighted, setIsHighlighted] = useState(false);

  return (
    <>
      <Title $isHighlight={isHighlighted}>
        Hello! <span className="small">Welcome to my world!</span>
      </Title>
      <button onClick={() => setIsHighlighted(!isHighlighted)}>click</button>
    </>
  );
}

export default StyledComponentsCSS;
