import styled from "styled-components";
import { Field } from "formik";

export const StyledField = styled(Field)`
  background-color: #E5E4E4;
  border-radius: 0.25em;
  margin-bottom: 1em;
  resize: none;
  line-height: 1.5em;
  width: 100%;
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
  margin: 0.5em 0;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 0.25em;
`;
