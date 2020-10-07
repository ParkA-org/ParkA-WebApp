import styled from "styled-components"

export const Container = styled.div`
    width: 99vw;
    height: 85vh;
    display: grid;
    grid-template-columns: 3fr 1fr 3fr 1fr;
`;

export const ControllersContainer = styled.div`
    grid-column: 1 / span 4;
    height: 90px;
    grid-row: 1;
    width: 80vw;
    display: flex;
    justify-content: start;
    align-items: start;
    padding: 0.5em 0 0 0.5em;
    z-index: 3;
`;


export const ButtonsContainer = styled.div`
    margin-top: 0.7em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    position: relative;
`;

export const ButtonSection = styled.section`
    display: flex;
    height: 50px;
    padding: 0.5em;
    width: auto;
    justify-content: space-around;
    align-items: center;
    & > button {
        padding: 0.5em;
        height: auto;
        width: auto;
        border-radius: 20px;
    }
`;

export const SearchContainer = styled.div`
    width: 300px;
    z-index: 3;

    & > input {
        width: 100%;
    }
`;

export const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    grid-column: 1 / span 4;
    grid-row: 1 / span 5;
    z-index: 2;
`;

export const LegendContainer = styled.div`
    align-self: start;
    flex-grow: 2;
    display: flex;
    justify-content: center;
`;

export const Legend = styled.div`
    border: 2px solid #cecece;
    padding: 0.5em;
    height: auto;
    width: auto;
    font-size: 2rem;
    font-weight: 600;
    background-color: #fff;
    width: auto;
    border-radius: 20px;
    & > p {
        display: inline;
        margin-left: 0.5em;
    }
`;