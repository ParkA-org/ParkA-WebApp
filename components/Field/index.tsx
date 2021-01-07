import { CSSProperties, useRef } from "react";
import {
  StyledLabel,
  StyledField,
  ErrorMessage,
  UploaderImage,
  FieldContainer,
  CheckboxContainer,
} from "./styles";
import Button from "components/Button";
import { FormikErrors, FormikTouched } from "formik/dist/types";

type FieldProps = {
  type?: string;
  label: string;
  name: string;
  errorMessage?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isTouched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  placement?: string;
  component?: string;
  placeholder?: string;
  value?: string;
  inputStyles?: CSSProperties;
  checked?: boolean;
  onClick?: any;
  onChange?: any;
  defaultChecked?: boolean;
  containerStyles?: CSSProperties;
};

export default function Field({
  type = "text",
  name,
  label,
  errorMessage,
  onChange,
  isTouched,
  component,
  placeholder,
  value,
  placement = "vertical",
  inputStyles,
  containerStyles,
  checked,
}: FieldProps): JSX.Element {
  if (type === "checkbox") {
    return (
      <CheckboxContainer>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledField
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          style={inputStyles}
          onChange={onChange}
        />
      </CheckboxContainer>
    );
  }
  return (
    <>
      <FieldContainer placement={placement} style={containerStyles}>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledField
          type={type}
          name={name}
          component={component}
          placeholder={placeholder}
          value={value}
          style={inputStyles}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FieldContainer>
    </>
  );
}

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  placement?: string;
  value?: string;
  children: JSX.Element[];
  errorMessage: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isTouched: boolean | FormikTouched<any> | FormikTouched<any>[];
  containerStyles?: CSSProperties;
};

export function SelectField({
  name,
  label,
  placeholder,
  children,
  placement = "vertical",
  errorMessage,
  isTouched,
  value,
  containerStyles,
}: SelectFieldProps): JSX.Element {
  return (
    <>
      <FieldContainer placement={placement} style={containerStyles}>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledField
          component="select"
          name={name}
          placeholder={placeholder}
          value={value}
        >
          {children}
        </StyledField>
      </FieldContainer>
      {errorMessage && isTouched ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : null}
    </>
  );
}

type FileUploaderProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  placeholderImage?: string;
};

export function FileUploader({
  setFieldValue,
  placeholderImage,
}: FileUploaderProps): JSX.Element {
  const imgEl = useRef(null),
    inputEl = useRef(null);
  const handleChange = (event) => {
    event.persist();
    const file = event.target.files[0];
    setFieldValue("file", file, false);
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
      <UploaderImage
        src={placeholderImage ? placeholderImage : "/icons/cameraIcon.svg"}
        ref={imgEl}
        alt="uploaded by the user"
      />
      <input
        type="file"
        id="input"
        onChange={handleChange}
        style={{ display: "none" }}
        accept="image/*"
        ref={inputEl}
      />
      <Button onClick={handleClick}>Subir una imagen</Button>
      <style jsx>
        {`
          button {
            font-size: 4rem;
          }
        `}
      </style>
    </>
  );
}
