import React, { useRef } from "react";
import { StyledLabel, StyledField, ErrorMessage } from "./styles";
import Button from "../Button";

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

export function FileUploader(): JSX.Element {
  const imgEl = useRef(null),
    inputEl = useRef(null);
  const handleChange = (event) => {
    event.persist();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        imgEl.current.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    inputEl.current.click();
  };

  return (
    <>
      <img
        src="./images/porjectLogo.png"
        ref={imgEl}
        alt="uploaded by the user"
        style={{ width: "100%", height: "100%" }}
      />
      <input
        type="file"
        id="input"
        onChange={handleChange}
        style={{ display: "none" }}
        ref={inputEl}
      />
      <Button onClick={handleClick}>Upload a photo</Button>
    </>
  );
}
