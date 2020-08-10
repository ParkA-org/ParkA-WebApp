import styled from "styled-components";
import { Field } from "formik";

export const StyledField = styled(Field)`
  border: 1px solid #333;
  border-radius: 0.25em;
  margin-bottom: 1em;
  resize: none;
  line-height: 1.5em;
  width: 15vw;
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

export const FormContainer = styled.div`
  padding: 1em;
  display: grid;
  height: auto;
  width: 40vw;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    "left right"
    "left right"
    "left right";

  column-gap: 2em;
  row-gap: 2em;

  @media (max-width: 768px) {
    grid-template-areas:
      "left"
      "right";
    width: auto;
    column-gap: 1.5em;
    row-gap: 1.5em;
  }
`;

export const FieldSide = styled.div`
  grid-area: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20vw;
  min-width: 275px;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: none;
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    width: 100%;
    padding-bottom: 1.5em;
  }
`;

export const ContactContainer = styled.div`
  width: auto;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 3em;
  border-radius: 0.5em;
  -webkit-box-shadow: 0px 20px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 20px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 20px 5px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 1em;
    border: none;
    box-shadow: none;
  }
`;

export const InformationSide = styled.div`
  grid-area: right;
  height: 80%;
  display: flex;
  width: 20vw;
  min-width: 275px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > h3 {
    width: 200px;
  }
`;
