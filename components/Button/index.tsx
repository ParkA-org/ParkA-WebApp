import React from "react";
import { StyledButton } from "./styles";
import { HandlerFunction } from "@storybook/addon-actions";

type props = {
  onClick?: HandlerFunction;
  children?: React.ReactNode;
  type?: string;
};

export default function Button({
  children,
  onClick,
  type,
}: props): JSX.Element {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
}
