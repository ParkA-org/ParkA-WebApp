import React from "react";
import { StyledLabel, StyledField, ErrorMessage } from "./styles";

type FieldProps = {
  type?: string;
  label: string;
  name: string;
  errorMessage: string;
  isTouched: boolean;
  component?: string;
  placeholder?: string;
};

export default function Field({
  type = "text",
  name,
  label,
  errorMessage,
  isTouched,
  component,
  placeholder,
}: FieldProps): JSX.Element {
  return (
    <>
      <StyledLabel htmlFor={type}>{label}</StyledLabel>
      <StyledField
        type={type}
        name={name}
        component={component}
        placeholder={placeholder}
      />
      {errorMessage && isTouched ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : null}
    </>
  );
}
