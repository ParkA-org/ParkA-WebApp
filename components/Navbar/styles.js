import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const HiddenContainerVariants = {
  open: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const ListItemVariants = {
  open: {
    display: "inherit",
  },
  closed: {
    display: "none",
  },
};

export const Menu = styled(motion.ul)`
  padding: 1em;
  display: flex;
  width: 80vw;
  max-width: 1380px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HiddenContainer = styled(motion.div).attrs(() => ({
  initial: "open",
  variants: HiddenContainerVariants,
}))`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ListItem = styled(motion.li).attrs(() => ({
  initial: "open",
  variants: ListItemVariants,
}))`
  list-style: none;
  margin: 1em;
  color: #084c7c;
  display: inline-block;
  font-weight: bold;
  font-size: 1.2em;
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
  font-size: 2.5em;
  font-weight: 900;
  flex-grow: 2;
  font-family: "Righteous";
  display: flex;
  align-items: center;
  color: #037185;
  &:hover {
    cursor: pointer;
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
    width: 35px;
    height: 5px;
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
    top: -10px;
  }
  &::after {
    top: 10px;
  }
`;
