import styled from "styled-components"

export const Container = styled.div`
    display: grid;
    align-items: start;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto; 
    width: 50%;
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

export const StyledInput = styled.input`
    background-color: #e5e4e4;
    border-radius: 10px;
    border: none;
    padding: 0.25em;
    max-width: 300px;
`;

export const ElementContainer = styled.div`
    text-align: left;
    margin-bottom: 1.5em;

    & > label {
        display: block;
    }

    & > svg {
        width: 50;
        height: 50;
        display: inline-block;
    }

`;

export const CheckboxContainer = styled.div`
    display: block;
    & > input[type="checkbox"] {
        display: inline-block;
        margin-right: 0.5em;
    }
`;

export const StyledSelect = styled.select`
    width: 200px;
    background-color: #e5e4e4;
    padding: 0.5em; 
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