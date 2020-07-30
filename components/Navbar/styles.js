import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const ListItem = styled(motion.li)`
  list-style: none;
  margin: 1em;
  color: #084c7c;
  ${(props) =>
    props.hide &&
    css`
      display: none;
    `}
  @media(max-width: 768px) {
    margin: 1em 0;
  }
`;

export const Hamburguer = styled(motion.button)`
  opacity: 0;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: #333;
  border: none;
  border-radius: 50%;
  @media (max-width: 768px) {
    opacity: 1;
  }
`;

export const Logo = styled(motion.li)`
  list-style: none;
  font-size: 2em;
  font-weight: 900;
  flex-grow: 2;
  display: flex;
  align-items: center;
  color: #037185;
`;

export const Button = styled(motion.button)`
  color: #fff;
  background-color: #59bca7;
  border: none;
  width: fit-content;
  border-radius: 0.8em;
  margin: 1em;
  font-weight: bold;
  padding: 1em;

  ${(props) =>
    props.hide &&
    css`
      display: none;
    `}

  @media(max-width: 768px) {
    margin: 1em 0;
  }
`;

export const Menu = styled(motion.ul)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 1.5em;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
