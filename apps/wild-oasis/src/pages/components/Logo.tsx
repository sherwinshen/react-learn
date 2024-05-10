import styled from "styled-components";
import { useTheme } from "../../context";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useTheme();
  const logoSrc = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={logoSrc} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
