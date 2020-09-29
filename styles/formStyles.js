import styled from "styled-components";

export const MainFormContainer = styled.div`
  margin-top: 2em;
  padding: 2em 0.5em;
  width: 100%;
  height: auto;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: #fff;
  -webkit-box-shadow: 0px 20px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 20px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 20px 5px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }


  @media (min-width: 768px) {
    width: 80vw;
    max-width: 1000px;
    box-shadow: none;
  }
`;

export const FormHeading = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 1em;
  & > h2 {
    font-family: "Mulish";
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }
  img {
    width: 200px;
  }
  
  @media(min-width: 768px) {
    width: 80%;
    padding-left: 3em;
  }

`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 1em;
  height: auto;
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: #fff;
  grid-template-areas:
    "field information"
    "field information"
    "field information"
    "actions actions";

  column-gap: 1em;
  row-gap: 0.5em;

  @media (max-width: 768px) {
    grid-template-areas:
      "field"
      "information"
      "acitons";
    width: auto;
    column-gap: 1.5em;
    row-gap: 1.5em;
  }
`;

export const FieldSection = styled.div`
  grid-area: field;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  min-width: 275px;
  text-align: left;
  border-bottom: none;
  
  & > a {
    align-self: center;
  }

  @media (max-width: 768px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    width: 100%;
    padding-bottom: 1.5em;
  }
`;

export const InformationSection = styled.div`
  grid-area: information;
  height: 80%;
  display: flex;
  width: 100%;
  max-width: 550px;
  max-height: 400px;
  min-width: 275px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  & > h3 {
    width: 100%;
  }

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const ActionSection = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CompactActionSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 15vw;

  & > a:nth-child(2) {
    color: #023944;
  }
`;

export const AdditionalInfo = styled.p`
  overflow-wrap: break-word;
  max-width: 250px;
  margin: 0.25em 0;
`;
