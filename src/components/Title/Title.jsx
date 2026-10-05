import styled from "styled-components";

const StyledTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 600;
  color: #4d3d88;
  margin: 0;
  line-height: 1;
  letter-spacing: -1.5px;
  white-space: nowrap;
`;

function Title() {
  return <StyledTitle>She Dose;</StyledTitle>;
}

export default Title;
