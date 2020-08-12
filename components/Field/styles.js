import styled from "styled-components";
import { Field } from "formik";

export const StyledField = styled(Field)`
  border: 1px solid #333;
  border-radius: 0.25em;
  margin-bottom: 1em;
  resize: none;
  line-height: 1.5em;
  width: 15vw;
  text-align: left;
  padding: 0.5em;
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const StyledLabel = styled.label`
  font-weight: bolder;
  font-size: 1.25em;
  text-align: left;
  margin-bottom: 0.5em;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: auto auto auto 0;
`;
