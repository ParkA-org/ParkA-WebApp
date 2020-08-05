import React from "react";
import { StyledButton } from "./styles";
import { HandlerFunction } from "@storybook/addon-actions";

type props = {
  onClick?: HandlerFunction;
  children?: React.ReactNode;
};

export default function Button({ children, onClick }: props): JSX.Element {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
