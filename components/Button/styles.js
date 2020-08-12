import styled from "styled-components";
import { motion } from "framer-motion";

const ButtonVariants = {
  open: {
    display: "inherit",
  },
  closed: {
    display: "none",
  },
};
export const StyledButton = styled(motion.button).attrs(() => ({
  initial: "open",
  variants: ButtonVariants,
}))`
    color: #fff;
    background-color: #3d907f;
    border: none;
    width: fit-content;
    border-radius: 1.2em;
    margin: 1em;
    padding: 0.5em 1em;
    display: inline-block;
    font-size: 1.1em;
    &:hover {
    background-color: #037185;
    cursor: pointer;
    filter: drop-shadow(4px 4px 4px hsla(0deg, 0%, 0%, 0.5));
    }

    @media (max-width: 768px) {
    margin: 1em 0;
`;
