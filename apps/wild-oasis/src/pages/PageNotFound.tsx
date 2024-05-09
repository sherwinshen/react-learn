import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../components/Heading";
import ButtonText from "../components/button/ButtonText";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">The page you are looking for could not be found 😢</Heading>
        <ButtonText onClick={moveBack}>&larr; Go back</ButtonText>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;