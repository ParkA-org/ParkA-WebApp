import styled from "styled-components"

export const Container = styled.section`
    magin: 2em 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 20vh;
    background-color: #f4f4f4;   
    padding: 1em;
`;

export const ItemsContainer = styled.div`
    display: grid;
    grid-template-areas:
    "earning timings"
    "earning timings";
    justify-items: center;
    align-items: start;
    grid-gap: 20px;
    width: 60%;
`;

export const EarningsContainer = styled.div`
    grid-area: earning;
`;

export const TimingContainer = styled.div`
    grid-area: timings;
`;

export const Item = styled.div`
    margin-bottom: 0.5em;
    width: 210px;
    & > h3 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    & > h3 > svg {
        margin: 0 0.35em;
    }
    & > p {
        font-size: 1.2rem;
    }
`;

export const ChartContainer = styled.div``
