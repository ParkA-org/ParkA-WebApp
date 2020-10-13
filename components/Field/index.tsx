import { CSSProperties, useRef } from "react";
import { StyledLabel, StyledField, ErrorMessage, UploaderImage, FieldContainer } from "./styles";
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
};

export default function Field({
  type = "text",
  name,
  label,
  errorMessage,
  isTouched,
  component,
  placeholder,
  value,
  placement = "vertical",
  inputStyles,
}: FieldProps): JSX.Element {
  return (
    <FieldContainer placement={placement}>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledField
        type={type}
        name={name}
        component={component}
        placeholder={placeholder}
        value={value}
        {...inputStyles}
      />
      {errorMessage && isTouched ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : null}
    </FieldContainer>
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
};

export function SelectField({
  name,
  label,
  placeholder,
  children,
  placement = "vertical",
  errorMessage,
  isTouched,
  value
}: SelectFieldProps): JSX.Element {
  return (
    <FieldContainer placement={placement}>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledField component="select" name={name} placeholder={placeholder} value={value}>
        {children}
      </StyledField>
      {errorMessage && isTouched ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : null}
    </FieldContainer>
  );
}

type FileUploaderProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export function FileUploader({ setFieldValue }: FileUploaderProps): JSX.Element {
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
        src="../icons/cameraIcon.svg"
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
