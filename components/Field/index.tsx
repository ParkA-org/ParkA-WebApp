import React from "react";
import { FieldProps } from "formik";
import { StyledLabel, StyledField, ErrorMessage } from "./styles";
import { DatePicker, DatePickerInput } from "carbon-components-react";

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
};

export function SelectField({
  name,
  label,
  placeholder,
  children,
}: SelectFieldProps): JSX.Element {
  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledField as="select" name={name} placeholder={placeholder}>
        {children}
      </StyledField>
    </>
  );
}

// type DateProps = {
//   field: any;
//   form: any;
//   name: string;
// };

// function DatePickerComponent({
//   field,
//   form: { touched, errors },
//   name
// }: DateProps): JSX.Element {
//   return (
//     <DatePicker
//       dateFormat="d/m/Y"
//       datePickerType="single"
//       onChange={(e) => {
//         console.log()
//         console.log(e.toLocaleString().split(",")[0])
//       }}
//     >
//       <DatePickerInput
//         id="date-picker-calendar-id"
//         placeholder="dd/mm/yyyy"
//         name={name}
//         labelText="Date picker"
//         type="text"
//       />
//     </DatePicker>
//   );
// }

// export function DatePickerField({ name }: { name: string }): JSX.Element {
//   return <StyledField component={DatePickerComponent} name={name} />;
// }
