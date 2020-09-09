import styled from "styled-components";

export const StyledLink = styled.a`
  color: #333;
  font-size: 1.2rem;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

export const SpecialLink = styled(StyledLink)`
  color: #0b768c;
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    filter: drop-shadow(2px 2px 4px hsla(0deg, 0%, 0%, 0.5));
  }
`;
