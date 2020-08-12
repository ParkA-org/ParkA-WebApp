import styled from "styled-components";

export const FormContainer = styled.div`
  padding: 1em;
  display: grid;
  height: auto;
  width: auto;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    "field information"
    "field information"
    "field information"
    "actions actions";

  column-gap: 2em;
  row-gap: 1em;

  @media (max-width: 768px) {
    grid-template-areas:
      "field"
      "information";
    width: auto;
    column-gap: 1.5em;
    row-gap: 1.5em;
  }
`;

export const FieldSection = styled.div`
  grid-area: field;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20vw;
  min-width: 275px;
  text-align: left;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: none;
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    width: 100%;
    padding-bottom: 1.5em;
  }
`;

export const MainFormContainer = styled.div`
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

export const InformationSection = styled.div`
  grid-area: information;
  height: 80%;
  display: flex;
  max-width: 450px;
  max-height: 400px;
  min-width: 275px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > h3 {
    width: 200px;
  }

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const ActionSection = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const AdditionalInfo = styled.p`
  overflow-wrap: break-word;
  max-width: 250px;
  margin: 0.25em 0;
`;
