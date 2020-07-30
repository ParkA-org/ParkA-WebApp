import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const ListItem = styled(motion.li)`
  list-style: none;
  margin: 1em;
  color: #084c7c;
  display: inline-block;
  &:hover {
    cursor: pointer;
    filter: drop-shadow(2px 2px 4px hsla(0deg, 0%, 0%, 0.5));
  }
  @media (max-width: 768px) {
    margin: 1em 0;
    ${(props) =>
      props.hide &&
      css`
        display: none;
      `}
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
`;

export const Logo = styled(motion.li)`
  list-style: none;
  font-size: 2em;
  font-weight: 900;
  flex-grow: 2;
  display: flex;
  align-items: center;
  color: #037185;
  &:hover {
    cursor: pointer;
  }
`;

export const Button = styled(motion.button)`
  color: #fff;
  background-color: #3d907f;
  border: none;
  width: fit-content;
  border-radius: 0.8em;
  margin: 1em;
  font-weight: bold;
  padding: 1em;
  display: inline-block;

  &:hover {
    background-color: #037185;
    cursor: pointer;
    filter: drop-shadow(2px 2px 4px hsla(0deg, 0%, 0%, 0.5));
  }

  @media (max-width: 768px) {
    margin: 1em 0;

    ${(props) =>
      props.hide &&
      css`
        display: none;
      `}
  }
`;

export const Menu = styled(motion.ul)`
  padding: 1em;
  display: flex;
  width: 100vw;
  justify-content: space-between;
  font-size: 1.5em;
  background-color: #64c7b2;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Hamburger = styled.i`
  margin-right: 0.5em;
  & {
    transform: scale(var(--ggs, 1));
  }
  &,
  &::after,
  &::before {
    opacity: 0;
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 3px;
    background: currentColor;
    @media (max-width: 768px) {
      opacity: 1;
    }
  }
  &::after,
  &::before {
    content: "";
    position: absolute;
    top: -6px;
  }
  &::after {
    top: 6px;
  }
`;
