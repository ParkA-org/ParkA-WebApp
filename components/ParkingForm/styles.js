import styled from "styled-components"

export const Container = styled.div`
    margin: 0 auto;    
    display: grid;
    align-items: start;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 0.fr; 
    width: 100%;
    padding-top: 1.5em;
    height: auto;
    background-color: #fff;
    label {
        font-size: 1.3rem;
    }
`;

export const LeftSection = styled.div`
    grid-column: 1 / 2;
    grid-row: 1 / 1;
`;

export const RightSection = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 1;
`;

export const CenterSection = styled.div`
    grid-column: 1 / 3;
    grid-row: 2;
    width: 75%;
    place-self: center center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1em;
`;

export const StyledInput = styled.input`
    background-color: #e5e4e4;
    border-radius: 10px;
    border: none;
    padding: 0.25em;
    width: 300px;
`;

export const ElementContainer = styled.div`
    text-align: left;
    margin-bottom: 0.5em;

    & > label {
        display: block;
    }

    & > div {
        display: flex;
        align-items: center;
    }

    & > svg {
        width: 50;
        height: 50;
        display: inline-block;
    }

`;

export const CheckboxContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > input[type="checkbox"] {
        display: inline-block;
        margin-right: 0.5em;
    }
`;

export const StyledImage = styled.img`
    display: block;
    border-radius: 20%;
    border: 1px solid #63C7B2;
    margin: 1em 0;
    width: 200px;
    height: 150px;
    box-shadow: 0px 25px 10px rgba(0,0,0, 0.25);
`;

export const DayCheckboxContainer = styled.div`
    margin: 0.5em 0;
    display: flex;
    flex-direction: column;

    label {
        font-size: 1rem;
    }
`;

export const HourPickerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > b {
        margin-bottom: 0.5em;
    }
`;

export const StyledButton = styled.button`
    padding: 0.5em;
    font-size: 1.1rem;
    background-color: #59BCA7;
    color: white;
    width: auto;
    border-radius: 60px;
`;

export const ScheduleHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 295px;
    margin-bottom: 1em;

    & > p {
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

export const ImageSquare = styled.img`
    width: 150px;
    height: 150px;
`;