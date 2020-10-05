import { useRef } from "react";
import { StyledLabel, StyledField, ErrorMessage, UploaderImage, FieldContainer } from "./styles";
import Button from "components/Button";
import { FormikErrors, FormikTouched } from "formik/dist/types";

type FieldProps = {
  type?: string;
  label: string;
  name: string;
  errorMessage: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isTouched: boolean | FormikTouched<any> | FormikTouched<any>[];
  placement?: string;
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
  placement = "vertical"
}: FieldProps): JSX.Element {
  return (
    <FieldContainer placement={placement}>
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
    </FieldContainer>
  );
}

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  children: JSX.Element[];
  errorMessage: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isTouched: boolean | FormikTouched<any> | FormikTouched<any>[];
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
    <FieldContainer>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledField component="select" name={name} placeholder={placeholder}>
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
        src="../placeholders/vector-image-placeholder.svg"
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
