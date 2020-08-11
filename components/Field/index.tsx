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
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
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

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  children: JSX.Element[];
  errorMessage: string;
  isTouched: boolean;
};

export function SelectField({
  name,
  label,
  placeholder,
  children,
  errorMessage,
  isTouched,
}: SelectFieldProps): JSX.Element {
  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledField component="select" name={name} placeholder={placeholder}>
        {children}
      </StyledField>
      {errorMessage && isTouched ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : null}
    </>
  );
}
