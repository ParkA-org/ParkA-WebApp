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
    color: ${(props) => (props.rank === "primary" ? "#ffffff" : "#59BCA7")};
    background-color: ${(props) =>
    props.rank === "primary" ? "#3d907f" : "#ffffff"};
    border: none;
    border: ${(props) =>
    props.rank === "primary" ? "none" : "2px solid #336F8B"};
    width: fit-content;
    border-radius: 1.2em;
    border-radius: ${(props) => (props.rank === "primary" ? "50px" : "10px")};
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
    }
`;
