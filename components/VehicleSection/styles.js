import styled from "styled-components"

export const HeaderSection = styled.div`
    margin: 2em auto;
    display: flex;
    justify-content: space-between;
    width: 60%;
`;

export const VehicleList = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

export const NewLink = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color: #0B768C;

    & > svg {
        margin-right: 0.5em;
    }
`;