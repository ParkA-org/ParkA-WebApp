import styled from "styled-components"

export const ScheduleHead = styled.div`
    display: flex;
    justify-content: space-between;
    width: 295px;
    margin-bottom: 1em;

    & > p {
        font-size: 1.2rem;
        font-weight: bold;
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


export const HourPickerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > b {
        margin-bottom: 0.5em;
    }
`;
