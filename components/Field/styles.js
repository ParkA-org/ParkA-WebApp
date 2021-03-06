import styled from "styled-components";
import { Field } from "formik";

export const StyledField = styled(Field)`
  background-color: #e5e4e4;
  border-radius: 0.25em;
  margin-bottom: 1em;
  resize: none;
  max-width: ${(props) => (props.component === "textarea" ? "350px" : "300px")};
  line-height: 1.5em;
  width: 100%;
  height: ${(props) => (props.component === "textarea" ? "200px" : "auto")};
  text-align: left;
  padding: 0.5em;
  @media (max-width: 768px) {
    width: auto;
  }
  font-size: ${(props) =>
    props.component === "textarea" ? "1.1rem" : "1.25rem"};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > input[type="checkbox"] {
    display: inline-block;
    margin-right: 0.5em;
  }
`;

export const UploaderImage = styled.img`
  width: 80%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
  padding: 1.5em;
  border: 2px solid #077187;
  border-radius: 50%;
`;

export const StyledLabel = styled.label`
  font-weight: bolder;
  font-size: 1.25em;
  text-align: left;
  color: #333;
  margin: 0.5em 1em 0.5em 0;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 0.25em;
`;

export const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.placement === "vertical" ? "column" : "row"};
  justify-content: ${(props) =>
    props.placement === "vertical" ? "flex-start" : "space-between"};
`;
