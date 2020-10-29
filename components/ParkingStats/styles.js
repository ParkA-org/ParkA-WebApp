import styled from "styled-components"

export const Container = styled.section`
    magin: 2em 0;
    display: flex;
    justify-content: center;
    width: 99vw;
    height: auto;
    background-color: #f4f4f4;   
    padding: 2em 0;
`;

export const ItemsContainer = styled.div`
    display: grid;
    grid-template-areas:
    "earning timings"
    "earning timings";
    justify-items: center;
    align-items: space-around;
    grid-gap: 20px;
    width: 50%;
`;

export const EarningsContainer = styled.div`
    grid-area: earning;
`;

export const TimingContainer = styled.div`
    grid-area: timings;
`;

export const Item = styled.div`
    margin-bottom: 0.5em;
    width: auto;
    text-align: left;
    & > h3 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.5rem;
    }

    & > h3 > svg {
        margin: 0 0.35em;
    }
    & > p {
        font-size: 1.2rem;
        margin-left: 3em;
    }
`;

export const ChartContainer = styled.div``
