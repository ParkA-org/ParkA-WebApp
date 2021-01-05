
import { StyledButton } from "./styles";
import { HandlerFunction } from "@storybook/addon-actions";
import { CSSProperties } from "react";

type props = {
  onClick?: HandlerFunction;
  children?: React.ReactNode;
  submit?: boolean;
  rank?: string;
  styles?: CSSProperties;
};

export default function Button({
  children,
  onClick,
  submit,
  rank = "primary",
  styles,
}: props): JSX.Element {
  return (
    <StyledButton onClick={onClick} type={submit ? "submit" : "button"} rank={rank} style={styles}>
      {children}
    </StyledButton>
  );
}
