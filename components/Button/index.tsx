
import { StyledButton } from "./styles";
import { HandlerFunction } from "@storybook/addon-actions";

type props = {
  onClick?: HandlerFunction;
  children?: React.ReactNode;
  submit?: boolean;
  rank?: string;
};

export default function Button({
  children,
  onClick,
  submit,
  rank = "primary",
}: props): JSX.Element {
  return (
    <StyledButton onClick={onClick} type={submit ? "submit" : ""} rank={rank}>
      {children}
    </StyledButton>
  );
}
