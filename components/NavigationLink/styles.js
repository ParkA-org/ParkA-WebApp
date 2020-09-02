import styled from "styled-components";

export const StyledLink = styled.a`
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

export const SpecialLink = styled(StyledLink)`
  color: #0b768c;
  display: inline-block;
  font-weight: bold;
  font-size: 1.2em;
  &:hover {
    cursor: pointer;
    filter: drop-shadow(2px 2px 4px hsla(0deg, 0%, 0%, 0.5));
  }
`;
