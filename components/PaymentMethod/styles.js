import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2em;
    padding-left: 2em;
    height: 90%;
    border-left: 2px solid #333;
`;

export const MainContainer = styled.div`
    background-color: #fff;
    padding-top: 2em;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
`;

export const DataContainer = styled.div`
    font-size: 1.2rem;
    text-align: left;
    margin-bottom: 1em;
    margin-left: 4em;
    display: flex;
    justify-content: space-around;
    & > div > * {
        margin-bottom: 0.5em;
    }

    & > div > select {
        width: 200px;
        background-color: #e5e4e4;
    }
`;

export const StyledInput = styled.input`
    background-color: #f6f6f6;
    padding: 0.5em;
    border-radius: 5px;
`;  

export const StyledSelect = styled.select`
    width: 200px;
    background-color: #e5e4e4;
    padding: 0.5em; 
`;