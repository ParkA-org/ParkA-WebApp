import React from "react";
import { StyledLabel, StyledField, ErrorMessage } from "./styles";

type FieldProps = {
  type?: string;
  label: string;
  name: string;
  errorMessage: string;
  isTouched: boolean;
  component?: string;
};

export default function Field({
  type = "text",
  name,
  label,
  errorMessage,
  isTouched,
  component,
}: FieldProps): JSX.Element {
  return (
    <>
      <StyledLabel htmlFor={type}>{label}</StyledLabel>
      <StyledField type={type} name={name} component={component} />
      {errorMessage && isTouched ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : null}
    </>
  );
}
